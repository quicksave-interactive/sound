import { Ticker } from '@pixi/ticker';
import { EventEmitter } from '@pixi/utils';
import { IMediaInstance } from '../interfaces';
import { PlayOptions } from '../Sound';
import { WebAudioMedia } from './WebAudioMedia';
import { WebAudioUtils } from './WebAudioUtils';

let id = 0;

/**
 * A single play instance that handles the AudioBufferSourceNode.
 * @class
 * @memberof webaudio
 * @param {SoundNodes} source - Reference to the SoundNodes.
 */
class WebAudioInstance extends EventEmitter implements IMediaInstance
{
    /**
     * The current unique ID for this instance.
     * @readonly
     */
    public readonly id: number;

    /**
     * The source Sound.
     * @type {webaudio.WebAudioMedia}
     */
    private _media: WebAudioMedia;

    /**
     * true if paused.
     * @type {boolean}
     */
    private _paused: boolean;

    /**
     * true if muted.
     * @type {boolean}
     */
    private _muted: boolean;

    /**
     * true if paused.
     * @type {boolean}
     */
    private _pausedReal: boolean;

    /**
     * The instance volume
     * @type {number}
     */
    private _volume: number;

    /**
     * Last update frame number.
     * @type {number}
     */
    private _lastUpdate: number;

    /**
     * The total number of seconds elapsed in playback.
     * @type {number}
     */
    private _elapsed: number;

    /**
     * Playback rate, where 1 is 100%.
     * @type {number}
     */
    private _speed: number;

    /**
     * Playback rate, where 1 is 100%.
     * @type {number}
     */
    private _end: number;

    /**
     * `true` if should be looping.
     * @type {boolean}
     */
    private _loop: boolean;

    /**
     * Gain node for controlling volume of instance
     * @type {GainNode}
     */
    private _gain: GainNode;

    /**
     * Length of the sound in seconds.
     * @type {number}
     */
    private _duration: number;

    /**
     * The progress of the sound from 0 to 1.
     * @type {number}
     */
    private _progress: number;

    /**
     * Audio buffer source clone from Sound object.
     * @type {AudioBufferSourceNode}
     */
    private _source: AudioBufferSourceNode;

    constructor(media: WebAudioMedia)
    {
        super();

        this.id = id++;
        this._media = null;
        this._paused = false;
        this._muted = false;
        this._elapsed = 0;

        // Initialize
        this.init(media);
    }

    /**
     * Set a property by name, this makes it easy to chain values
     * @param {string} name - - Values include: 'speed', 'volume', 'muted', 'loop', 'paused'
     * @param {number|boolean} value - - Value to set property to
     */
    public set(name: 'speed' | 'volume' | 'muted' | 'loop' | 'paused', value: number | boolean): this
    {
        if (this[name] === undefined)
        {
            throw new Error(`Property with name ${name} does not exist.`);
        }
        else
        {
            switch (name)
            {
                case 'speed': this.speed = value as number; break;
                case 'volume': this.volume = value as number; break;
                case 'muted': this.muted = value as boolean; break;
                case 'loop': this.loop = value as boolean; break;
                case 'paused': this.paused = value as boolean; break;
            }
        }

        return this;
    }

    /** Stops the instance, don't use after this. */
    public stop(): void
    {
        if (this._source)
        {
            this._internalStop();
            this.emit('stop');
        }
    }

    /** Set the instance speed from 0 to 1 */
    public get speed(): number
    {
        return this._speed;
    }
    public set speed(speed: number)
    {
        this._speed = speed;
        this.refresh();
        this._update(true); // update progress
    }

    /** Get the set the volume for this instance from 0 to 1 */
    public get volume(): number
    {
        return this._volume;
    }
    public set volume(volume: number)
    {
        this._volume = volume;
        this.refresh();
    }

    /** `true` if the sound is muted */
    public get muted(): boolean
    {
        return this._muted;
    }
    public set muted(muted: boolean)
    {
        this._muted = muted;
        this.refresh();
    }

    /** If the sound instance should loop playback */
    public get loop(): boolean
    {
        return this._loop;
    }
    public set loop(loop: boolean)
    {
        this._loop = loop;
        this.refresh();
    }

    /** Refresh loop, volume and speed based on changes to parent */
    public refresh(): void
    {
        // Sound could be paused
        if (!this._source)
        {
            return;
        }
        const global = this._media.context;
        const sound = this._media.parent;

        // Updating looping
        this._source.loop = this._loop || sound.loop;

        // Update the volume
        const globalVolume = global.volume * (global.muted ? 0 : 1);
        const soundVolume = sound.volume * (sound.muted ? 0 : 1);
        const instanceVolume = this._volume * (this._muted ? 0 : 1);

        WebAudioUtils.setParamValue(this._gain.gain, instanceVolume * soundVolume * globalVolume);

        // Update the speed
        WebAudioUtils.setParamValue(this._source.playbackRate, this._speed * sound.speed * global.speed);
    }

    /** Handle changes in paused state, either globally or sound or instance */
    public refreshPaused(): void
    {
        const global = this._media.context;
        const sound = this._media.parent;

        // Consider global and sound paused
        const pausedReal = this._paused || sound.paused || global.paused;

        if (pausedReal !== this._pausedReal)
        {
            this._pausedReal = pausedReal;

            if (pausedReal)
            {
                // pause the sounds
                this._internalStop();

                /**
                 * The sound is paused.
                 * @event paused
                 */
                this.emit('paused');
            }
            else
            {
                /**
                 * The sound is unpaused.
                 * @event resumed
                 */
                this.emit('resumed');

                // resume the playing with offset
                this.play({
                    start: this._elapsed % this._duration,
                    end: this._end,
                    speed: this._speed,
                    loop: this._loop,
                    volume: this._volume,
                });
            }

            /**
             * The sound is paused or unpaused.
             * @event pause
             * @property {boolean} paused - If the instance was paused or not.
             */
            this.emit('pause', pausedReal);
        }
    }

    /**
     * Plays the sound.
     * @param {Object} options - Play options
     * @param {number} options.start - The position to start playing, in seconds.
     * @param {number} options.end - The ending position in seconds.
     * @param {number} options.speed - Speed for the instance
     * @param {boolean} options.loop - If the instance is looping, defaults to sound loop
     * @param {number} options.volume - Volume of the instance
     * @param {boolean} options.muted - Muted state of instance
     */
    public play(options: PlayOptions): void
    {
        const { start, end, speed, loop, volume, muted } = options;

        if (end)
        {
            // eslint-disable-next-line no-console
            console.assert(end > start, 'End time is before start time');
        }
        this._paused = false;
        const { source, gain } = this._media.nodes.cloneBufferSource();

        this._source = source;
        this._gain = gain;
        this._speed = speed;
        this._volume = volume;
        this._loop = !!loop;
        this._muted = muted;
        this.refresh();

        const duration: number = this._source.buffer.duration;

        this._duration = duration;
        this._end = end;
        this._lastUpdate = this._now();
        this._elapsed = start;
        this._source.onended = this._onComplete.bind(this);

        if (this._loop)
        {
            this._source.loopEnd = end;
            this._source.loopStart = start;
            this._source.start(0, start);
        }
        else if (end)
        {
            this._source.start(0, start, end - start);
        }
        else
        {
            this._source.start(0, start);
        }

        /**
         * The sound is started.
         * @event start
         */
        this.emit('start');

        // Do an update for the initial progress
        this._update(true);

        // Start handling internal ticks
        this.enableTicker(true);
    }

    /**
     * Start the update progress.
     * @type {boolean}
     */
    private enableTicker(enabled: boolean): void
    {
        Ticker.shared.remove(this._updateListener, this);
        if (enabled)
        {
            Ticker.shared.add(this._updateListener, this);
        }
    }

    /**
     * The current playback progress from 0 to 1.
     * @type {number}
     */
    public get progress(): number
    {
        return this._progress;
    }

    /**
     * Pauses the sound.
     * @type {boolean}
     */
    public get paused(): boolean
    {
        return this._paused;
    }

    public set paused(paused: boolean)
    {
        this._paused = paused;
        this.refreshPaused();
    }

    /** Don't use after this. */
    public destroy(): void
    {
        this.removeAllListeners();
        this._internalStop();
        if (this._gain)
        {
            this._gain.disconnect();
            this._gain = null;
        }
        if (this._media)
        {
            this._media.context.events.off('refresh', this.refresh, this);
            this._media.context.events.off('refreshPaused', this.refreshPaused, this);
            this._media = null;
        }
        this._end = null;
        this._speed = 1;
        this._volume = 1;
        this._loop = false;
        this._elapsed = 0;
        this._duration = 0;
        this._paused = false;
        this._muted = false;
        this._pausedReal = false;
    }

    /**
     * To string method for instance.
     * @return The string representation of instance.
     */
    public toString(): string
    {
        return `[WebAudioInstance id=${this.id}]`;
    }

    /**
     * Get the current time in seconds.
     * @return Seconds since start of context
     */
    private _now(): number
    {
        return this._media.context.audioContext.currentTime;
    }

    /**
     * Callback for update listener
     * @type {Function}
     */
    private _updateListener()
    {
        this._update();
    }

    /** Internal update the progress. */
    private _update(force = false): void
    {
        if (this._source)
        {
            const now: number = this._now();
            const delta: number = now - this._lastUpdate;

            if (delta > 0 || force)
            {
                const speed: number = this._source.playbackRate.value;

                this._elapsed += delta * speed;
                this._lastUpdate = now;
                const duration: number = this._duration;
                let progress: number;

                if (this._source.loopStart)
                {
                    const soundLength = this._source.loopEnd - this._source.loopStart;

                    progress = (this._source.loopStart + (this._elapsed % soundLength)) / duration;
                }
                else
                {
                    progress = (this._elapsed % duration) / duration;
                }

                // Update the progress
                this._progress = progress;

                /**
                 * The sound progress is updated.
                 * @event progress
                 * @property {number} progress - Amount progressed from 0 to 1
                 * @property {number} duration - The total playback in seconds
                 */
                this.emit('progress', this._progress, duration);
            }
        }
    }

    /** Initializes the instance. */
    public init(media: WebAudioMedia): void
    {
        this._media = media;
        media.context.events.on('refresh', this.refresh, this);
        media.context.events.on('refreshPaused', this.refreshPaused, this);
    }

    /** Stops the instance. */
    private _internalStop(): void
    {
        if (this._source)
        {
            this.enableTicker(false);
            this._source.onended = null;
            this._source.stop(0); // param needed for iOS 8 bug
            this._source.disconnect();
            try
            {
                this._source.buffer = null;
            }
            catch (err)
            {
                // try/catch workaround for bug in older Chrome versions
                console.warn('Failed to set AudioBufferSourceNode.buffer to null:', err);
            }
            this._source = null;
        }
    }

    /** Callback when completed. */
    private _onComplete(): void
    {
        if (this._source)
        {
            this.enableTicker(false);
            this._source.onended = null;
            this._source.disconnect();
            try
            {
                this._source.buffer = null;
            }
            catch (err)
            {
                // try/catch workaround for bug in older Chrome versions
                console.warn('Failed to set AudioBufferSourceNode.buffer to null:', err);
            }
        }
        this._source = null;
        this._progress = 1;
        this.emit('progress', 1, this._duration);
        /**
         * The sound ends, don't use after this
         * @event end
         */
        this.emit('end', this);
    }
}

export { WebAudioInstance };
