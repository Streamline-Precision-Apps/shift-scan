"use client";
import { useUserStore } from "@/app/lib/store/userStore";
import React, {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
    createContext,
    useContext,
    useState,
    useCallback,
    Suspense,
<<<<<<< HEAD
} from "react";

interface UserProfileContextType {
    image: string | null;
    name: string;
    role: string;
    refresh: () => Promise<void>;
    setImage: (img: string | null) => void;
    loading: boolean;
=======
  createContext,
  useContext,
  useState,
  useCallback,
  Suspense,
} from "react";

interface UserProfileContextType {
  image: string | null;
  name: string;
  role: string;
  refresh: () => Promise<void>;
  setImage: (img: string | null) => void;
  loading: boolean;
>>>>>>> 5e409804 (migrated client folder to main branch and removed the client structure)
=======
} from "react";

interface UserProfileContextType {
    image: string | null;
    name: string;
    role: string;
    refresh: () => Promise<void>;
    setImage: (img: string | null) => void;
    loading: boolean;
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
}

// Create a cache for the user image promise
let imageCache: Promise<string | null> | null = null;
let imageData: string | null = null;

// Function to fetch user image data
const fetchUserImage = async (): Promise<string | null> => {
<<<<<<< HEAD
<<<<<<< HEAD
    if (imageData !== null) return imageData;

    if (!imageCache) {
        imageCache = fetch("/api/getUserImage")
            .then(async (response) => {
                // Check for authentication errors
                if (response.status === 401 || response.status === 403) {
                    console.error(
                        "🔐 Authentication failed - token may be invalid or expired"
                    );
                    console.error(
                        "Clearing local storage and redirecting to sign in page..."
                    );
                    if (typeof window !== "undefined") {
                        localStorage.clear();
                        window.location.href = "/signin";
                    }
                    throw new Error("Authentication failed");
                }

                if (!response.ok)
                    throw new Error("Failed to fetch profile picture");
                const data = await response.json();
                imageData = data.image || null;
                return imageData;
            })
            .catch((error) => {
                console.error("Error fetching profile picture:", error);
                imageData = null;
                return null;
            });
    }

    return imageCache;
=======
  if (imageData !== null) return imageData;
=======
    if (imageData !== null) return imageData;
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)

    if (!imageCache) {
        imageCache = fetch("/api/getUserImage")
            .then(async (response) => {
                // Check for authentication errors
                if (response.status === 401 || response.status === 403) {
                    console.error(
                        "🔐 Authentication failed - token may be invalid or expired"
                    );
                    console.error(
                        "Clearing local storage and redirecting to sign in page..."
                    );
                    if (typeof window !== "undefined") {
                        localStorage.clear();
                        window.location.href = "/signin";
                    }
                    throw new Error("Authentication failed");
                }

<<<<<<< HEAD
  return imageCache;
>>>>>>> 5e409804 (migrated client folder to main branch and removed the client structure)
=======
                if (!response.ok)
                    throw new Error("Failed to fetch profile picture");
                const data = await response.json();
                imageData = data.image || null;
                return imageData;
            })
            .catch((error) => {
                console.error("Error fetching profile picture:", error);
                imageData = null;
                return null;
            });
    }

    return imageCache;
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
};

// Main UserImage component using user.image from store
export const UserImage: React.FC<{
<<<<<<< HEAD
<<<<<<< HEAD
    className?: string;
    alt?: string;
}> = ({ className, alt = "profile" }) => {
    const { user } = useUserStore();
    const imageUrl = user?.image || "/profileEmpty.svg";
    return (
        <img
            src={imageUrl}
            alt={alt}
            className={className}
            onError={(e) => {
                e.currentTarget.src = "/profileEmpty.svg";
            }}
        />
    );
=======
  className?: string;
  alt?: string;
}> = ({ className, alt = "profile" }) => {
  const { user } = useUserStore();
  const imageUrl = user?.image || "/profileEmpty.svg";
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "/profileEmpty.svg";
      }}
    />
  );
>>>>>>> 5e409804 (migrated client folder to main branch and removed the client structure)
=======
    className?: string;
    alt?: string;
}> = ({ className, alt = "profile" }) => {
    const { user } = useUserStore();
    const imageUrl = user?.image || "/profileEmpty.svg";
    return (
        <img
            src={imageUrl}
            alt={alt}
            className={className}
            onError={(e) => {
                e.currentTarget.src = "/profileEmpty.svg";
            }}
        />
    );
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
};

// Component that uses Suspense for async name loading
const AsyncUserName: React.FC<{
<<<<<<< HEAD
<<<<<<< HEAD
    onDataLoad: (data: { name: string; role: string }) => void;
    className?: string;
    maxLength?: number;
}> = ({ onDataLoad, className = "", maxLength = 12 }) => {
    const { user } = useUserStore();
    const [displayName, setDisplayName] = useState<string>("");

    React.useEffect(() => {
        if (user) {
            const name =
                user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName.slice(0, 1)}`
                    : "";
            const role = user.permission || "";

            setDisplayName(name);
            onDataLoad({ name, role });
        }
    }, [user, onDataLoad]);

    const truncatedName =
        displayName.length >= maxLength
            ? displayName.slice(0, maxLength) + "..."
            : displayName;

    return (
        <div
            className={`justify-start text-black text-xs font-bold ${className}`}
        >
            {truncatedName}
        </div>
    );
=======
  onDataLoad: (data: { name: string; role: string }) => void;
  className?: string;
  maxLength?: number;
=======
    onDataLoad: (data: { name: string; role: string }) => void;
    className?: string;
    maxLength?: number;
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
}> = ({ onDataLoad, className = "", maxLength = 12 }) => {
    const { user } = useUserStore();
    const [displayName, setDisplayName] = useState<string>("");

    React.useEffect(() => {
        if (user) {
            const name =
                user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName.slice(0, 1)}`
                    : "";
            const role = user.permission || "";

            setDisplayName(name);
            onDataLoad({ name, role });
        }
    }, [user, onDataLoad]);

    const truncatedName =
        displayName.length >= maxLength
            ? displayName.slice(0, maxLength) + "..."
            : displayName;

<<<<<<< HEAD
  return (
    <div className={`justify-start text-black text-xs font-bold ${className}`}>
      {truncatedName}
    </div>
  );
>>>>>>> 5e409804 (migrated client folder to main branch and removed the client structure)
=======
    return (
        <div
            className={`justify-start text-black text-xs font-bold ${className}`}
        >
            {truncatedName}
        </div>
    );
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
};

// Component that uses Suspense for async role loading
const AsyncUserRole: React.FC<{
<<<<<<< HEAD
<<<<<<< HEAD
    onDataLoad: (data: { name: string; role: string }) => void;
    className?: string;
}> = ({ onDataLoad, className = "" }) => {
    const { user } = useUserStore();
    const [displayRole, setDisplayRole] = useState<string>("");

    React.useEffect(() => {
        if (user) {
            const name =
                user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName.slice(0, 1)}`
                    : "";
            const role = user.permission || "";

            setDisplayRole(role);
            onDataLoad({ name, role });
        }
    }, [user, onDataLoad]);

    return (
        <div
            className={`text-center justify-start text-neutral-400 text-[10px] font-normal ${className}`}
        >
            {displayRole}
        </div>
    );
=======
  onDataLoad: (data: { name: string; role: string }) => void;
  className?: string;
=======
    onDataLoad: (data: { name: string; role: string }) => void;
    className?: string;
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
}> = ({ onDataLoad, className = "" }) => {
    const { user } = useUserStore();
    const [displayRole, setDisplayRole] = useState<string>("");

    React.useEffect(() => {
        if (user) {
            const name =
                user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName.slice(0, 1)}`
                    : "";
            const role = user.permission || "";

            setDisplayRole(role);
            onDataLoad({ name, role });
        }
    }, [user, onDataLoad]);

<<<<<<< HEAD
  return (
    <div
      className={`text-center justify-start text-neutral-400 text-[10px] font-normal ${className}`}
    >
      {displayRole}
    </div>
  );
>>>>>>> 5e409804 (migrated client folder to main branch and removed the client structure)
=======
    return (
        <div
            className={`text-center justify-start text-neutral-400 text-[10px] font-normal ${className}`}
        >
            {displayRole}
        </div>
    );
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
};

// Fallback components for Suspense
const UserNameFallback: React.FC<{ className?: string }> = ({
<<<<<<< HEAD
<<<<<<< HEAD
    className = "",
}) => (
    <div className={`justify-start text-black text-xs font-bold ${className}`}>
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
    </div>
);

const UserRoleFallback: React.FC<{ className?: string }> = ({
    className = "",
}) => (
    <div
        className={`text-center justify-start text-neutral-400 text-[10px] font-normal ${className}`}
    >
        <div className="h-2 w-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
=======
  className = "",
=======
    className = "",
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
}) => (
    <div className={`justify-start text-black text-xs font-bold ${className}`}>
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
    </div>
);

const UserRoleFallback: React.FC<{ className?: string }> = ({
    className = "",
}) => (
<<<<<<< HEAD
  <div
    className={`text-center justify-start text-neutral-400 text-[10px] font-normal ${className}`}
  >
    <div className="h-2 w-16 bg-gray-200 rounded animate-pulse"></div>
  </div>
>>>>>>> 5e409804 (migrated client folder to main branch and removed the client structure)
=======
    <div
        className={`text-center justify-start text-neutral-400 text-[10px] font-normal ${className}`}
    >
        <div className="h-2 w-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
);

// Main UserName component with Suspense boundary
export const UserName: React.FC<{
<<<<<<< HEAD
<<<<<<< HEAD
    onDataLoad?: (data: { name: string; role: string }) => void;
    className?: string;
    maxLength?: number;
}> = ({ onDataLoad = () => {}, className, maxLength }) => (
    <Suspense fallback={<UserNameFallback className={className} />}>
        <AsyncUserName
            onDataLoad={onDataLoad}
            className={className}
            maxLength={maxLength}
        />
    </Suspense>
=======
  onDataLoad?: (data: { name: string; role: string }) => void;
  className?: string;
  maxLength?: number;
}> = ({ onDataLoad = () => {}, className, maxLength }) => (
  <Suspense fallback={<UserNameFallback className={className} />}>
    <AsyncUserName
      onDataLoad={onDataLoad}
      className={className}
      maxLength={maxLength}
    />
  </Suspense>
>>>>>>> 5e409804 (migrated client folder to main branch and removed the client structure)
=======
    onDataLoad?: (data: { name: string; role: string }) => void;
    className?: string;
    maxLength?: number;
}> = ({ onDataLoad = () => {}, className, maxLength }) => (
    <Suspense fallback={<UserNameFallback className={className} />}>
        <AsyncUserName
            onDataLoad={onDataLoad}
            className={className}
            maxLength={maxLength}
        />
    </Suspense>
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
);

// Main UserRole component with Suspense boundary
export const UserRole: React.FC<{
<<<<<<< HEAD
<<<<<<< HEAD
    onDataLoad?: (data: { name: string; role: string }) => void;
    className?: string;
}> = ({ onDataLoad = () => {}, className }) => (
    <Suspense fallback={<UserRoleFallback className={className} />}>
        <AsyncUserRole onDataLoad={onDataLoad} className={className} />
    </Suspense>
=======
  onDataLoad?: (data: { name: string; role: string }) => void;
  className?: string;
}> = ({ onDataLoad = () => {}, className }) => (
  <Suspense fallback={<UserRoleFallback className={className} />}>
    <AsyncUserRole onDataLoad={onDataLoad} className={className} />
  </Suspense>
>>>>>>> 5e409804 (migrated client folder to main branch and removed the client structure)
=======
    onDataLoad?: (data: { name: string; role: string }) => void;
    className?: string;
}> = ({ onDataLoad = () => {}, className }) => (
    <Suspense fallback={<UserRoleFallback className={className} />}>
        <AsyncUserRole onDataLoad={onDataLoad} className={className} />
    </Suspense>
>>>>>>> 2942e0fe (Changes in timesheets section and form section for submission date fixes.)
);

// UserProfileProvider is not needed if you use useUserStore directly everywhere.
