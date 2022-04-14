import { useEffect } from 'react';
import { ActorRef, Behavior, EventObject } from 'xstate';
import { ObservableActorRef } from 'xstate/src/ObservableActorRef';
import useConstant from './useConstant';

/**
 * React hook that spawns an `ActorRef` with the specified `behavior`.
 * The returned `ActorRef` can be used with the `useActor(actorRef)` hook.
 *
 * @param behavior The actor behavior to spawn
 * @returns An ActorRef with the specified `behavior`
 */
export function useSpawn<TState, TEvent extends EventObject>(
  behavior: Behavior<TEvent, TState>
): ActorRef<TEvent, TState> {
  const actorRef = useConstant(() => {
    return new ObservableActorRef(behavior, '');
  });

  useEffect(() => {
    actorRef.start!();
    return () => actorRef!.stop!();
  }, []);

  return actorRef;
}
