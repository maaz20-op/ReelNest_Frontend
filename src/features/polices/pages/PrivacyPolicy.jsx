import React from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { Button } from "../../../components/reusableComponents/Button";

export const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full  h-full overflow-y-scroll account-settings bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <div className="max-w-(--breakpoint-screen1100) mx-auto px-[var(--page-x-padding)] py-12 md:pl-[var(--page-left-padding)]">
        {/* Header Section */}
        <div className="border-b flex flex-col gap-6 border-[var(--border-color)] pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Privacy <span className="text-[var(--accent)]">Policy</span>
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2 font-mono">
            Last Updated: August 14, 2026
          </p>
          <Button
            background="bg-red-800"
            content={
              <div className="flex gap-4 justify-center items-center">
                <Icons.back color="white" />
                <p>Go to Home</p>
              </div>
            }
            fnc={() => navigate("/")}
          />
        </div>

        {/* Main Content Box */}
        <div className="space-y-8 text-base leading-relaxed max-w-4xl">
          <section className="bg-[var(--bg-tertiary)] p-5 rounded-lg border border-[var(--border-color)]">
            <p className="text-[var(--text-primary)] font-medium">
              Welcome to our application. Your privacy is critically important
              to us. This Privacy Policy document outlines the types of personal
              information that is received and collected when you use Google
              Login on our platform and how we use it.
            </p>
          </section>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              1. Information We Collect Via Google OAuth
            </h2>
            <p className="text-[var(--text-secondary)]">
              When you authenticate using Google Sign-In, you explicitly grant
              us permission to access specific profile information from your
              Google Account. We only collect the following data:
            </p>
            <ul className="space-y-2 pl-5 list-disc text-[var(--text-secondary)] marker:text-[var(--accent)]">
              <li>
                <strong className="text-[var(--text-primary)]">
                  Full Name & Last Name:
                </strong>{" "}
                To personalize your user dashboard and identify your account
                profile.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">
                  Email Address:
                </strong>{" "}
                To securely log you into your account, send transaction
                receipts, account updates, and communicate critical service
                alerts.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">
                  Profile Image / Picture:
                </strong>{" "}
                To display your avatar or profile photo inside your personalized
                application dashboard.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              2. How We Use Your Information
            </h2>
            <p className="text-[var(--text-secondary)]">
              We use the collected information for the following specific
              purposes:
            </p>
            <ul className="space-y-2 pl-5 list-disc text-[var(--text-secondary)] marker:text-[var(--accent)]">
              <li>
                To provide, operate, and maintain our website and user accounts.
              </li>
              <li>
                To improve, personalize, and expand our application features.
              </li>
              <li>
                To send you transactional and security emails related to your
                account activity.
              </li>
              <li>To prevent fraudulent logins and maintain security.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              3. Data Storage and Retention
            </h2>
            <p className="text-[var(--text-secondary)]">
              Your user profile details (Name, Email, and Profile Image URL) are
              stored securely in our database. We do not store your Google
              password. Your data is retained only as long as your account
              remains active. You can request data deletion at any time by
              contacting us.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              4. GDPR & CCPA Compliance (Your Rights)
            </h2>
            <p className="text-[var(--text-secondary)]">
              In accordance with the General Data Protection Regulation (GDPR),
              California Consumer Privacy Act (CCPA), and CalOPPA, users have
              the following rights regarding their data:
            </p>
            <ul className="space-y-2 pl-5 list-disc text-[var(--text-secondary)] marker:text-[var(--accent)]">
              <li>
                <strong className="text-[var(--text-primary)]">
                  The Right to Access:
                </strong>{" "}
                You can request copies of your personal data stored with us.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">
                  The Right to Erasure (Delete Data):
                </strong>{" "}
                You have the right to request that we erase your personal data
                from our servers.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">
                  The Right to Rectification:
                </strong>{" "}
                You can request that we correct any information you believe is
                inaccurate.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              5. Third-Party Sharing
            </h2>
            <p className="text-[var(--text-secondary)]">
              We do not sell, trade, or rent your personal identification
              information to third parties. Your data is purely utilized to
              facilitate the login framework via Google identity services.
            </p>
          </section>

          {/* Section 6 / Contact */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              6. Contact Us
            </h2>
            <p className="text-[var(--text-secondary)]">
              If you have any questions about this Privacy Policy, your rights,
              or data deletion, please contact us at:
            </p>
            <div className="bg-[var(--bg-secondary)] p-5 rounded-lg border border-[var(--border-color)] space-y-1">
              <p className="text-sm">
                <span className="text-[var(--text-muted)] font-medium">
                  Email:
                </span>{" "}
                <span className="hover:text-[var(--accent)] cursor-pointer transition-colors">
                  support@reel-nest-frontend.vercel.app
                </span>
              </p>
              <p className="text-sm">
                <span className="text-[var(--text-muted)] font-medium">
                  Website:
                </span>{" "}
                <span className="hover:text-[var(--accent)] cursor-pointer transition-colors">
                  https://reel-nest-frontend.vercel.app
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
