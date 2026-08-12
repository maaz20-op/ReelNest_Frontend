import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-0 w-full flex flex-col items-center justify-center py-12 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative overflow-hidden"
      style={{
        paddingLeft: "var(--page-x-padding)",
        paddingRight: "var(--page-x-padding)",
      }}
    >
      {/* Background Decorative Accent Blobs - scaled for smaller screens */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none opacity-20 sm:opacity-25 transition-all duration-500"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center space-y-4 sm:space-y-6">
        {/* Responsive 404 Text */}
        <div className="relative inline-block">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-wider text-[var(--text-primary)] drop-shadow-sm select-none leading-none">
            404
          </h1>
          {/* Accent Underline */}
          <div className="h-1 sm:h-1.5 w-16 sm:w-24 mx-auto mt-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
        </div>

        {/* Status Badge */}
        <span
          className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wider border transition-colors duration-300"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            borderColor: "var(--border-color)",
            color: "var(--accent)",
          }}
        >
          PAGE NOT FOUND
        </span>

        {/* Text Container with responsive scaling */}
        <div className="space-y-2 px-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            Lost in the dark?
          </h2>
          <p
            className="text-xs sm:text-sm md:text-base leading-relaxed max-w-md mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            The page you are looking for doesn't exist or has been moved. Check
            the URL or head back home.
          </p>
        </div>

        {/* Action Buttons: Stack on Mobile, Row on Desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none pt-2 sm:pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 text-center min-w-[140px]"
            style={{ backgroundColor: "var(--follow-btn-bg)" }}
          >
            Back to Safety
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-xs sm:text-sm border transition-all duration-200 active:scale-95 text-center min-w-[140px]"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--hover-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--bg-secondary)")
            }
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
};
