import { Filter } from "../filters";

/**
 * Represents the audio context for playing back sounds. This can
 * represent either an HTML or WebAudio context.
 * @class
 */
export interface IMediaContext
{
    /** `true` if all sounds are muted */
    muted: boolean;

    /** Volume to apply to all sounds */
    volume: number;

    /** The speed of all sounds */
    speed: number;

    /** Set the paused state for all sounds */
    paused: boolean;

    /** Collection of global filters */
    filters: Filter[];

    /** Toggle mute for all sounds */
    toggleMute(): boolean;

    /** Toggle pause for all sounds */
    togglePause(): boolean;

    /** Dispatches event to refresh the paused state of playing instances. */
    refreshPaused(): void;

    /** Dispatch event to refresh all instances volume, mute, etc. */
    refresh(): void;

    /** Destroy the context and don't use after this. */
    destroy(): void;

    /** Reference to the Web Audio API AudioContext element, if Web Audio is available */
    audioContext: AudioContext;
}
