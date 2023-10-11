"use client";

import React from "react";
import { type CID, type AccountId } from "~/lib/validation/common";
import { useUser } from "~/stores/global";
import { CTA } from "../ui/cta";
import { ProposalDialog } from "../proposal-dialog";

export function CTAs({ accountId, cid }: { accountId: AccountId; cid: CID }) {
  const user = useUser();
  const isSignedIn = !!user;
  const isAdmin = isSignedIn && user.accountId === accountId;
  const nonAdmin = isSignedIn && !isAdmin;

  const adminActions = isAdmin ? (
    <>
      <CTA
        color="gray"
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5.25L14.25 7.5M14.25 7.5L16.5 5.25M14.25 7.5V3M12 15.75V14.85C12 13.5899 12 12.9598 11.7548 12.4785C11.539 12.0552 11.1948 11.711 10.7715 11.4952C10.2902 11.25 9.66012 11.25 8.4 11.25H5.1C3.83988 11.25 3.20982 11.25 2.72852 11.4952C2.30516 11.711 1.96095 12.0552 1.74524 12.4785C1.5 12.9598 1.5 13.5899 1.5 14.85V15.75M9.375 5.625C9.375 7.07475 8.19975 8.25 6.75 8.25C5.30025 8.25 4.125 7.07475 4.125 5.625C4.125 4.17525 5.30025 3 6.75 3C8.19975 3 9.375 4.17525 9.375 5.625Z"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        text="Invite contributor"
      />
      <CTA
        color="gray"
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_5026_9700)">
              <path
                d="M8.25 2.99919H5.1C3.83988 2.99919 3.20982 2.99919 2.72852 3.24443C2.30516 3.46014 1.96095 3.80435 1.74524 4.22772C1.5 4.70902 1.5 5.33908 1.5 6.59919V12.8992C1.5 14.1593 1.5 14.7894 1.74524 15.2707C1.96095 15.694 2.30516 16.0382 2.72852 16.254C3.20982 16.4992 3.83988 16.4992 5.1 16.4992H11.4C12.6601 16.4992 13.2902 16.4992 13.7715 16.254C14.1948 16.0382 14.539 15.694 14.7548 15.2707C15 14.7894 15 14.1593 15 12.8992V9.74919M5.99998 11.9992H7.25589C7.62277 11.9992 7.80622 11.9992 7.97885 11.9577C8.1319 11.921 8.27822 11.8604 8.41243 11.7782C8.5638 11.6854 8.69352 11.5557 8.95294 11.2963L16.125 4.12419C16.7463 3.50287 16.7463 2.49551 16.125 1.87419C15.5037 1.25287 14.4963 1.25287 13.875 1.87419L6.70293 9.04625C6.4435 9.30568 6.31378 9.43539 6.22102 9.58677C6.13878 9.72098 6.07817 9.86729 6.04143 10.0203C5.99998 10.193 5.99998 10.3764 5.99998 10.7433V11.9992Z"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_5026_9700">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        }
        text="Edit request"
      />
      <CTA color="gray" icon={<></>} text="Close" />
    </>
  ) : (
    <></>
  );

  const userActions = nonAdmin ? (
    <ProposalDialog accountId={accountId} cid={cid} disabled={false} />
  ) : (
    <></>
  );

  return (
    <div className="flex flex-row items-center justify-start gap-3">
      {adminActions}
      {userActions}
      <ProposalDialog accountId={accountId} cid={cid} disabled={false} />
      <CTA
        color="gray"
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5935 9.45565C15.7766 9.29872 15.8682 9.22025 15.9017 9.12687C15.9311 9.04492 15.9311 8.95527 15.9017 8.87332C15.8682 8.77995 15.7766 8.70148 15.5935 8.54454L9.24047 3.09908C8.9253 2.82893 8.76772 2.69385 8.6343 2.69055C8.51835 2.68767 8.40759 2.73861 8.33432 2.82852C8.25 2.93197 8.25 3.13952 8.25 3.55463V6.77607C6.64899 7.05616 5.1837 7.86741 4.09478 9.0855C2.90762 10.4135 2.25093 12.1321 2.25 13.9133V14.3723C3.03701 13.4242 4.01963 12.6575 5.13057 12.1245C6.11002 11.6547 7.16881 11.3763 8.25 11.303V14.4456C8.25 14.8607 8.25 15.0682 8.33432 15.1717C8.40759 15.2616 8.51835 15.3125 8.6343 15.3096C8.76772 15.3063 8.9253 15.1713 9.24047 14.9011L15.5935 9.45565Z"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        text="Share"
      />
    </div>
  );
}
