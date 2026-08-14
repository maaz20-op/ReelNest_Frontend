import React from "react";
import { Button } from "../../../components/reusableComponents/Button";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";

export const TermsOfService = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full overflow-y-scroll account-settings bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <div className="max-w-(--breakpoint-screen1100) mx-auto px-[var(--page-x-padding)] py-12 md:pl-[var(--page-left-padding)]">
        {/* Header Section */}
        <div className="border-b flex flex-col gap-6 border-[var(--border-color)] pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Terms of <span className="text-[var(--accent)]">Service</span>
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
              By accessing our website and authenticating through Google Login,
              you agree to comply with and be bound by the following Terms of
              Service. Please review them carefully.
            </p>
          </section>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              1. Acceptance of Terms
            </h2>
            <p className="text-[var(--text-secondary)]">
              By logging into this website using your Google Profile, you
              acknowledge that you have read, understood, and agreed to these
              terms. If you do not agree with any part of these terms, you must
              not use our authentication mechanisms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              2. User Accounts & Google Authentication
            </h2>
            <p className="text-[var(--text-secondary)]">
              To fully access the dynamic features of our platform, you are
              required to sign in via Google OAuth.
            </p>
            <ul className="space-y-2 pl-5 list-disc text-[var(--text-secondary)] marker:text-[var(--accent)]">
              <li>
                You are responsible for keeping your linked Google Account
                secure.
              </li>
              <li>
                You agree to provide accurate information (Full Name, Last Name,
                and Email Address) gathered through the login system.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                breach platform safety or security.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              3. Permitted Use & Restrictions
            </h2>
            <p className="text-[var(--text-secondary)]">
              Users are granted a limited, non-exclusive license to interact
              with our user interface. You explicitly agree not to:
            </p>
            <ul className="space-y-2 pl-5 list-disc text-[var(--text-secondary)] marker:text-[var(--accent)]">
              <li>
                Attempt to scrape, bypass, or reverse engineer any part of our
                Vercel infrastructure.
              </li>
              <li>
                Use fake credentials or duplicate accounts to abuse platform
                limitations.
              </li>
              <li>
                Transmit any malicious bugs, viruses, or disruptive structural
                scripts.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              4. Intellectual Property
            </h2>
            <p className="text-[var(--text-secondary)]">
              All visual assets, styling scripts, structural architecture, logo
              designs, and application components are the exclusive property of
              our brand. Copying or modifying them without direct permission is
              strictly forbidden.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              5. Limitation of Liability
            </h2>
            <p className="text-[var(--text-secondary)]">
              Our website is hosted and deployed using automated serverless
              tools. We provide our services on an "as-is" basis. We do not
              guarantee uninterrupted server uptimes and are not liable for any
              data disruption resulting from third-party hosting issues.
            </p>
          </section>

          {/* Section 6 / Contact */}
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-[var(--accent)] pl-3 text-[var(--text-primary)]">
              6. Service Modifications & Inquiries
            </h2>
            <p className="text-[var(--text-secondary)]">
              We reserve the right to update these terms at any given time
              without prior notification. For any clarifications regarding these
              rules, please reach out to our service deck:
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
                  https://vercel.app
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
