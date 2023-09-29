import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-300 pb-4 pt-16 md:px-8">
      <div className="flex max-w-screen-2xl flex-col gap-12 2xl:mx-auto">
        <div className="flex flex-row items-center justify-start gap-6 md:items-start">
          <FooterSection
            header={
              <h3 className="text-xl font-semibold text-stone-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="NEAR Horizon" />
              </h3>
            }
          >
            <p>
              An early stage accelerator empowering Web3 founders to build,
              connect, and grow
            </p>
            <div className="flex flex-row items-center justify-center gap-4">
              <a href="https://twitter.com/nearhorizon" target="_blank">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.55016 22.404C16.6045 22.404 21.5583 14.9008 21.5583 8.39591C21.5583 8.18498 21.5536 7.96935 21.5442 7.75841C22.5079 7.06151 23.3395 6.19831 24 5.20935C23.1025 5.60865 22.1496 5.86943 21.1739 5.98279C22.2013 5.36696 22.9705 4.39952 23.3391 3.25982C22.3726 3.83261 21.3156 4.23666 20.2134 4.45466C19.4708 3.66561 18.489 3.14317 17.4197 2.9681C16.3504 2.79304 15.2532 2.9751 14.2977 3.48615C13.3423 3.9972 12.5818 4.80876 12.1338 5.79536C11.6859 6.78197 11.5754 7.88867 11.8195 8.94435C9.86249 8.84614 7.94794 8.33776 6.19998 7.45215C4.45203 6.56655 2.90969 5.32349 1.67297 3.80357C1.0444 4.8873 0.852057 6.1697 1.13503 7.39014C1.418 8.61059 2.15506 9.6775 3.19641 10.374C2.41463 10.3492 1.64998 10.1387 0.965625 9.75998V9.82091C0.964925 10.9582 1.3581 12.0606 2.07831 12.9408C2.79852 13.821 3.80132 14.4246 4.91625 14.649C4.19206 14.8472 3.43198 14.8761 2.69484 14.7334C3.00945 15.7115 3.62157 16.5669 4.44577 17.1804C5.26997 17.7938 6.26512 18.1346 7.29234 18.1553C5.54842 19.5252 3.39417 20.2682 1.17656 20.2647C0.783287 20.2641 0.390399 20.24 0 20.1925C2.25286 21.6378 4.87353 22.4054 7.55016 22.404Z"
                    fill="#11181C"
                  />
                </svg>
              </a>
              <a href="#">
                <svg
                  width="24"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.7609 3.8541C23.7609 3.8541 23.5266 2.19941 22.8047 1.47285C21.8906 0.516602 20.8688 0.511914 20.4 0.455664C17.0438 0.211914 12.0047 0.211914 12.0047 0.211914H11.9953C11.9953 0.211914 6.95625 0.211914 3.6 0.455664C3.13125 0.511914 2.10938 0.516602 1.19531 1.47285C0.473438 2.19941 0.24375 3.8541 0.24375 3.8541C0.24375 3.8541 0 5.79941 0 7.74004V9.55879C0 11.4994 0.239062 13.4447 0.239062 13.4447C0.239062 13.4447 0.473437 15.0994 1.19062 15.826C2.10469 16.7822 3.30469 16.7494 3.83906 16.8525C5.76094 17.0354 12 17.0916 12 17.0916C12 17.0916 17.0438 17.0822 20.4 16.8432C20.8688 16.7869 21.8906 16.7822 22.8047 15.826C23.5266 15.0994 23.7609 13.4447 23.7609 13.4447C23.7609 13.4447 24 11.5041 24 9.55879V7.74004C24 5.79941 23.7609 3.8541 23.7609 3.8541ZM9.52031 11.7666V5.02129L16.0031 8.40566L9.52031 11.7666Z"
                    fill="#11181C"
                  />
                </svg>
              </a>
            </div>
          </FooterSection>
          <FooterSection
            header={
              <h3 className="text-base font-semibold text-gray-900">Explore</h3>
            }
          >
            <ul>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/requests">Contribution requests</Link>
              </li>
              <li>
                <Link href="/contributors">Contributors</Link>
              </li>
              <li>
                <Link href="/backers">Backers</Link>
              </li>
            </ul>
          </FooterSection>
          <FooterSection
            header={
              <h3 className="text-base font-semibold text-gray-900">Connect</h3>
            }
          >
            <ul>
              <li>
                <a href="https://lu.ma/u/usr-5oZHY9dEDbDcaHY" target="_blank">
                  Events calendar
                </a>
              </li>
              <li>
                <a href="mailto:horizon@near.foundation">
                  Reach out to us directly
                </a>
              </li>
            </ul>
          </FooterSection>
          <FooterSection
            header={
              <h3 className="text-base font-semibold text-gray-900">
                Get help
              </h3>
            }
          >
            <ul>
              <li>
                <Link href="/learn">Learning resources</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </FooterSection>
          <FooterSection
            header={<Link href="/onboarding">Create profile</Link>}
          />
        </div>
        <div className="flex flex-row items-center justify-between text-gray-600">
          <span>© 2023</span>
          <Link href="/terms" className="translate-x-8">
            Terms & conditions
          </Link>
          <span className="flex flex-row items-center gap-2">
            Built on
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/near-logo.svg" alt="NEAR logo" />
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({
  header,
  children,
}: {
  children?: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <div className="flex w-1/5 flex-col items-start justify-center gap-2 md:justify-start">
      <div className="flex h-11 flex-col items-start justify-center md:justify-start">
        {header}
      </div>
      {children}
    </div>
  );
}
