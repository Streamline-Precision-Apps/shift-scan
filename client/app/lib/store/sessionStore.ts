"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Timesheets = {
  id: number;
};
// Types for sessions
export type Session = {
  id: number;
  userId: string;
  timesheetId: Timesheets[];
  startTime: string; // ISO string
  endTime?: string | null; // ISO string
};

// Store type
export type SessionStoreState = {
  sessions: Session[];
  currentSessionId: number | null;
  // Session management
  addSession: (session: Session) => void;
  updateSession: (id: number, session: Partial<Session>) => void;
  removeSession: (id: number) => void;
  getSession: (id: number) => Session | undefined;

  // Current session management
  setCurrentSession: (sessionId: number | null) => void;
  getCurrentSession: () => Session | undefined;
  // Timesheet management
  setTimesheetId: (sessionId: number, timesheetId: number) => void;
  clearSessions: () => void;
};

export const useSessionStore = create<SessionStoreState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      // Session management
      addSession: (session: Session) =>
        set((state) => ({
          sessions: [...state.sessions, session],
        })),

      updateSession: (id: number, sessionData: Partial<Session>) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id ? { ...session, ...sessionData } : session
          ),
        })),

      removeSession: (id: number) =>
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
          currentSessionId:
            state.currentSessionId === id ? null : state.currentSessionId,
        })),

      getSession: (id: number) => {
        const state = get();
        return state.sessions.find((session) => session.id === id);
      },
      // Current session management
      setCurrentSession: (sessionId: number | null) =>
        set(() => ({
          currentSessionId: sessionId,
        })),

      getCurrentSession: () => {
        const state = get();
        return state.sessions.find(
          (session) => session.id === state.currentSessionId
        );
      },

      // Timesheet management
      setTimesheetId: (sessionId: number, timesheetId: number) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  timesheetId: [...session.timesheetId, { id: timesheetId }],
                }
              : session
          ),
        })),

      clearSessions: () =>
        set(() => ({
          sessions: [],
          currentSessionId: null,
        })),
    }),
    {
      name: "session-store",
    }
  )
);
