const ownerId = "nearhorizon.near";
/** @type {{ icon: SVGElement, text: string, link: string }[]} */
const navItems = [
  {
    text: "Home",
    link: "home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <path
          d="M5 11.1252H10M6.88606 2.22771L2.64712 5.52467C2.36376 5.74505 2.22209 5.85525 2.12002 5.99325C2.0296 6.11549 1.96225 6.2532 1.92127 6.39962C1.875 6.56491 1.875 6.7444 1.875 7.10337V11.6252C1.875 12.3253 1.875 12.6753 2.01124 12.9427C2.13108 13.1779 2.32231 13.3691 2.55751 13.489C2.8249 13.6252 3.17493 13.6252 3.875 13.6252H11.125C11.8251 13.6252 12.1751 13.6252 12.4425 13.489C12.6777 13.3691 12.8689 13.1779 12.9888 12.9427C13.125 12.6753 13.125 12.3253 13.125 11.6252V7.10337C13.125 6.7444 13.125 6.56491 13.0787 6.39962C13.0377 6.2532 12.9704 6.11549 12.88 5.99325C12.7779 5.85525 12.6362 5.74505 12.3529 5.52467L8.11394 2.22771C7.89436 2.05693 7.78457 1.97154 7.66334 1.93871C7.55637 1.90975 7.44363 1.90975 7.33666 1.93871C7.21543 1.97154 7.10564 2.05693 6.88606 2.22771Z"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Projects",
    link: "projects",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <path
          d="M3.77885 7.4671C3.38109 7.46711 2.98723 7.3867 2.61976 7.23048C2.25228 7.07426 1.91838 6.84529 1.63713 6.55663C1.35587 6.26798 1.13277 5.92529 0.980557 5.54814C0.828343 5.171 0.75 4.76677 0.75 4.35855C0.75 3.95033 0.828343 3.54611 0.980557 3.16896C1.13277 2.79181 1.35587 2.44913 1.63713 2.16047C1.91838 1.87182 2.25228 1.64284 2.61976 1.48662C2.98723 1.33041 3.38109 1.25 3.77885 1.25C4.58215 1.25 5.35254 1.57751 5.92056 2.16047C6.48858 2.74344 6.80769 3.53411 6.80769 4.35855C6.80769 5.18299 6.48858 5.97366 5.92056 6.55663C5.35254 7.1396 4.58215 7.4671 3.77885 7.4671ZM4.11538 14.375C3.31208 14.375 2.54169 14.0475 1.97367 13.4645C1.40565 12.8816 1.08654 12.0909 1.08654 11.2664C1.08654 10.442 1.40565 9.65134 1.97367 9.06837C2.54169 8.4854 3.31208 8.15789 4.11538 8.15789C4.91868 8.15789 5.68908 8.4854 6.2571 9.06837C6.82512 9.65134 7.14423 10.442 7.14423 11.2664C7.14423 12.0909 6.82512 12.8816 6.2571 13.4645C5.68908 14.0475 4.91868 14.375 4.11538 14.375ZM10.8462 7.4671C10.4484 7.46711 10.0545 7.3867 9.68707 7.23048C9.31959 7.07426 8.98569 6.84529 8.70444 6.55663C8.42318 6.26798 8.20008 5.92529 8.04786 5.54814C7.89565 5.171 7.81731 4.76677 7.81731 4.35855C7.81731 3.95033 7.89565 3.54611 8.04786 3.16896C8.20008 2.79181 8.42318 2.44913 8.70444 2.16047C8.98569 1.87182 9.31959 1.64284 9.68707 1.48662C10.0545 1.33041 10.4484 1.25 10.8462 1.25C11.6495 1.25 12.4199 1.57751 12.9879 2.16047C13.5559 2.74344 13.875 3.53411 13.875 4.35855C13.875 5.18299 13.5559 5.97366 12.9879 6.55663C12.4199 7.1396 11.6495 7.4671 10.8462 7.4671ZM10.8462 14.375C10.0429 14.375 9.27246 14.0475 8.70444 13.4645C8.13642 12.8816 7.81731 12.0909 7.81731 11.2664C7.81731 10.442 8.13642 9.65134 8.70444 9.06837C9.27246 8.4854 10.0429 8.15789 10.8462 8.15789C11.6495 8.15789 12.4199 8.4854 12.9879 9.06837C13.5559 9.65134 13.875 10.442 13.875 11.2664C13.875 12.0909 13.5559 12.8816 12.9879 13.4645C12.4199 14.0475 11.6495 14.375 10.8462 14.375ZM3.77885 6.08553C4.22512 6.08553 4.65312 5.90358 4.96869 5.57971C5.28426 5.25584 5.46154 4.81657 5.46154 4.35855C5.46154 3.90053 5.28426 3.46127 4.96869 3.1374C4.65312 2.81353 4.22512 2.63158 3.77885 2.63158C3.33257 2.63158 2.90457 2.81353 2.589 3.1374C2.27344 3.46127 2.09615 3.90053 2.09615 4.35855C2.09615 4.81657 2.27344 5.25584 2.589 5.57971C2.90457 5.90358 3.33257 6.08553 3.77885 6.08553ZM4.11538 12.9934C4.56166 12.9934 4.98966 12.8115 5.30523 12.4876C5.62079 12.1637 5.79808 11.7245 5.79808 11.2664C5.79808 10.8084 5.62079 10.3692 5.30523 10.0453C4.98966 9.72142 4.56166 9.53947 4.11538 9.53947C3.66911 9.53947 3.24111 9.72142 2.92554 10.0453C2.60998 10.3692 2.43269 10.8084 2.43269 11.2664C2.43269 11.7245 2.60998 12.1637 2.92554 12.4876C3.24111 12.8115 3.66911 12.9934 4.11538 12.9934ZM10.8462 6.08553C11.2924 6.08553 11.7204 5.90358 12.036 5.57971C12.3516 5.25584 12.5288 4.81657 12.5288 4.35855C12.5288 3.90053 12.3516 3.46127 12.036 3.1374C11.7204 2.81353 11.2924 2.63158 10.8462 2.63158C10.3999 2.63158 9.97188 2.81353 9.65631 3.1374C9.34074 3.46127 9.16346 3.90053 9.16346 4.35855C9.16346 4.81657 9.34074 5.25584 9.65631 5.57971C9.97188 5.90358 10.3999 6.08553 10.8462 6.08553ZM10.8462 12.9934C11.2924 12.9934 11.7204 12.8115 12.036 12.4876C12.3516 12.1637 12.5288 11.7245 12.5288 11.2664C12.5288 10.8084 12.3516 10.3692 12.036 10.0453C11.7204 9.72142 11.2924 9.53947 10.8462 9.53947C10.3999 9.53947 9.97188 9.72142 9.65631 10.0453C9.34074 10.3692 9.16346 10.8084 9.16346 11.2664C9.16346 11.7245 9.34074 12.1637 9.65631 12.4876C9.97188 12.8115 10.3999 12.9934 10.8462 12.9934Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    text: "Requests",
    link: "requests",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <path
          d="M6.12658 2.4362C5.73197 2.4362 5.35352 2.60554 5.07449 2.90697C4.79546 3.20841 4.6387 3.61723 4.6387 4.04352V7.01088C4.6387 7.10925 4.60252 7.2036 4.53813 7.27316C4.47374 7.34272 4.38641 7.3818 4.29534 7.3818H1.54849C1.15388 7.3818 0.775437 7.55114 0.496406 7.85257C0.217375 8.154 0.0606172 8.56283 0.0606172 8.98912V11.9565C0.0606172 12.1676 0.0991023 12.3766 0.173875 12.5716C0.248648 12.7666 0.358244 12.9438 0.496406 13.093C0.634568 13.2423 0.798591 13.3607 0.979108 13.4414C1.15963 13.5222 1.3531 13.5638 1.54849 13.5638H8.87342C9.06882 13.5638 9.26229 13.5222 9.44281 13.4414C9.62333 13.3607 9.78735 13.2423 9.92551 13.093C10.0637 12.9438 10.1733 12.7666 10.248 12.5716C10.3228 12.3766 10.3613 12.1676 10.3613 11.9565V8.98912C10.3613 8.89075 10.3975 8.7964 10.4619 8.72684C10.5263 8.65728 10.6136 8.6182 10.7047 8.6182H13.4515C13.8461 8.6182 14.2246 8.44886 14.5036 8.14743C14.7826 7.846 14.9394 7.43717 14.9394 7.01088V4.04352C14.9394 3.61723 14.7826 3.20841 14.5036 2.90697C14.2246 2.60554 13.8461 2.4362 13.4515 2.4362H6.12658ZM13.4515 7.3818H10.3613V3.6726H13.4515C13.5426 3.6726 13.6299 3.71168 13.6943 3.78124C13.7587 3.8508 13.7949 3.94515 13.7949 4.04352V7.01088C13.7949 7.10925 13.7587 7.2036 13.6943 7.27316C13.6299 7.34272 13.5426 7.3818 13.4515 7.3818ZM9.21678 7.3818H5.78322V4.04352C5.78322 3.94515 5.81939 3.8508 5.88379 3.78124C5.94818 3.71168 6.03551 3.6726 6.12658 3.6726H9.21678V7.3818ZM4.6387 8.6182V12.3274H1.54849C1.45743 12.3274 1.3701 12.2883 1.3057 12.2188C1.24131 12.1492 1.20514 12.0549 1.20514 11.9565V8.98912C1.20514 8.89075 1.24131 8.7964 1.3057 8.72684C1.3701 8.65728 1.45743 8.6182 1.54849 8.6182H4.6387ZM5.78322 8.6182H9.21678V11.9565C9.21678 12.0549 9.18061 12.1492 9.11621 12.2188C9.05182 12.2883 8.96449 12.3274 8.87342 12.3274H5.78322V8.6182Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.0302 2.86518C5.32024 2.55187 5.71452 2.375 6.12658 2.375H13.4515C13.8636 2.375 14.2578 2.55187 14.5479 2.86518C14.8378 3.17836 15 3.60229 15 4.04352V7.01088C15 7.45211 14.8378 7.87604 14.5479 8.18922C14.2578 8.50253 13.8636 8.6794 13.4515 8.6794H10.7047C10.631 8.6794 10.5595 8.71095 10.5062 8.76863C10.4526 8.82644 10.4219 8.90569 10.4219 8.98912V11.9565C10.4219 12.175 10.3821 12.3915 10.3046 12.5937C10.2271 12.7958 10.1134 12.9797 9.9698 13.1348C9.82621 13.2899 9.65553 13.4132 9.46737 13.4974C9.2792 13.5816 9.07737 13.625 8.87342 13.625H1.54849C1.34455 13.625 1.14272 13.5816 0.954547 13.4974C0.766392 13.4132 0.595706 13.2899 0.45212 13.1348C0.308542 12.9797 0.194848 12.7958 0.117346 12.5937C0.0398454 12.3915 0 12.175 0 11.9565V8.98912C0 8.54788 0.162216 8.12396 0.45212 7.81078C0.742153 7.49747 1.13643 7.3206 1.54849 7.3206H4.29534C4.36896 7.3206 4.44046 7.28905 4.49385 7.23137C4.54736 7.17355 4.57808 7.09431 4.57808 7.01088V4.04352C4.57808 3.60229 4.7403 3.17836 5.0302 2.86518ZM6.12658 2.4974C5.74942 2.4974 5.3868 2.65922 5.11877 2.94876C4.85062 3.23845 4.69932 3.63218 4.69932 4.04352V7.01088C4.69932 7.1242 4.65768 7.23364 4.58242 7.31495C4.50702 7.3964 4.40386 7.443 4.29534 7.443H1.54849C1.17133 7.443 0.808721 7.60482 0.540692 7.89436C0.272534 8.18405 0.121234 8.57778 0.121234 8.98912V11.9565C0.121234 12.1601 0.158359 12.3616 0.230404 12.5495C0.302447 12.7374 0.407946 12.9078 0.540692 13.0512C0.67343 13.1946 0.83079 13.3081 1.00367 13.3855C1.17654 13.4628 1.36165 13.5026 1.54849 13.5026H8.87342C9.06026 13.5026 9.24538 13.4628 9.41825 13.3855C9.59113 13.3081 9.74849 13.1946 9.88123 13.0512C10.014 12.9078 10.1195 12.7374 10.1915 12.5495C10.2636 12.3616 10.3007 12.1601 10.3007 11.9565V8.98912C10.3007 8.8758 10.3423 8.76636 10.4176 8.68505C10.493 8.6036 10.5961 8.557 10.7047 8.557H13.4515C13.8287 8.557 14.1913 8.39518 14.4593 8.10564C14.7275 7.81595 14.8788 7.42222 14.8788 7.01088V4.04352C14.8788 3.63218 14.7275 3.23845 14.4593 2.94876C14.1913 2.65922 13.8287 2.4974 13.4515 2.4974H6.12658ZM6.12658 3.7338C6.05296 3.7338 5.98146 3.76536 5.92807 3.82303C5.87455 3.88085 5.84384 3.96009 5.84384 4.04352V7.3206H9.15616V3.7338H6.12658ZM5.8395 3.73945C5.91489 3.658 6.01806 3.6114 6.12658 3.6114H9.2774V7.443H5.7226V4.04352C5.7226 3.9302 5.76423 3.82076 5.8395 3.73945ZM10.3007 3.6114H13.4515C13.56 3.6114 13.6632 3.658 13.7386 3.73945C13.8138 3.82076 13.8555 3.9302 13.8555 4.04352V7.01088C13.8555 7.1242 13.8138 7.23364 13.7386 7.31495C13.6632 7.3964 13.56 7.443 13.4515 7.443H10.3007V3.6114ZM10.4219 3.7338V7.3206H13.4515C13.5251 7.3206 13.5966 7.28905 13.65 7.23137C13.7035 7.17356 13.7342 7.09431 13.7342 7.01088V4.04352C13.7342 3.96009 13.7035 3.88085 13.65 3.82303C13.5966 3.76536 13.5251 3.7338 13.4515 3.7338H10.4219ZM1.54849 8.6794C1.47488 8.6794 1.40338 8.71095 1.34999 8.76863C1.29647 8.82644 1.26575 8.90569 1.26575 8.98912V11.9565C1.26575 12.0399 1.29647 12.1192 1.34999 12.177C1.40338 12.2346 1.47488 12.2662 1.54849 12.2662H4.57808V8.6794H1.54849ZM1.26142 8.68505C1.33681 8.6036 1.43998 8.557 1.54849 8.557H4.69932V12.3886H1.54849C1.43998 12.3886 1.33681 12.342 1.26142 12.2605C1.18615 12.1792 1.14452 12.0698 1.14452 11.9565V8.98912C1.14452 8.8758 1.18615 8.76636 1.26142 8.68505ZM5.7226 8.557H9.2774V11.9565C9.2774 12.0698 9.23577 12.1792 9.1605 12.2605C9.08511 12.342 8.98194 12.3886 8.87342 12.3886H5.7226V8.557ZM5.84384 8.6794V12.2662H8.87342C8.94704 12.2662 9.01854 12.2346 9.07193 12.177C9.12545 12.1192 9.15616 12.0399 9.15616 11.9565V8.6794H5.84384Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    text: "Contributors",
    link: "contributors",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <path
          d="M10 2.66735C10.9261 3.12757 11.5625 4.08321 11.5625 5.1875C11.5625 6.29179 10.9261 7.24743 10 7.70765M11.25 10.979C12.1947 11.4065 13.0453 12.1031 13.75 13M1.25 13C2.46656 11.4516 4.11824 10.5 5.9375 10.5C7.75676 10.5 9.40844 11.4516 10.625 13M8.75 5.1875C8.75 6.7408 7.4908 8 5.9375 8C4.3842 8 3.125 6.7408 3.125 5.1875C3.125 3.6342 4.3842 2.375 5.9375 2.375C7.4908 2.375 8.75 3.6342 8.75 5.1875Z"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Backers",
    link: "backers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <path
          d="M13.125 13.625H2.875C2.52497 13.625 2.34995 13.625 2.21626 13.5569C2.09865 13.497 2.00304 13.4013 1.94312 13.2837C1.875 13.15 1.875 12.975 1.875 12.625V2.375M13.125 4.875L9.72855 8.27145C9.6048 8.3952 9.54292 8.45708 9.47157 8.48026C9.4088 8.50066 9.3412 8.50066 9.27843 8.48026C9.20708 8.45708 9.1452 8.3952 9.02145 8.27145L7.85355 7.10355C7.7298 6.9798 7.66792 6.91792 7.59657 6.89474C7.5338 6.87434 7.4662 6.87434 7.40343 6.89474C7.33208 6.91792 7.2702 6.9798 7.14645 7.10355L4.375 9.875M13.125 4.875H10.625M13.125 4.875V7.375"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Perks",
    link: "perks",
    icon: (
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.375 3V1.75M9.375 10.5V9.25M5 6.125H6.25M12.5 6.125H13.75M11.125 7.875L11.875 8.625M11.125 4.375L11.875 3.625M1.875 13.625L7.5 8M7.625 4.375L6.875 3.625"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Events",
    link: "events",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <path
          d="M13.125 6.75H1.875M10 1.75V4.25M5 1.75V4.25M4.875 14.25H10.125C11.1751 14.25 11.7001 14.25 12.1012 14.0456C12.454 13.8659 12.7409 13.579 12.9206 13.2262C13.125 12.8251 13.125 12.3001 13.125 11.25V6C13.125 4.9499 13.125 4.42485 12.9206 4.02377C12.7409 3.67096 12.454 3.38413 12.1012 3.20436C11.7001 3 11.1751 3 10.125 3H4.875C3.8249 3 3.29985 3 2.89877 3.20436C2.54596 3.38413 2.25913 3.67096 2.07936 4.02377C1.875 4.42485 1.875 4.9499 1.875 6V11.25C1.875 12.3001 1.875 12.8251 2.07936 13.2262C2.25913 13.579 2.54596 13.8659 2.89877 14.0456C3.29985 14.25 3.8249 14.25 4.875 14.25Z"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Learn",
    link: "learn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <path
          d="M7.5 13H3.25C2.54993 13 2.1999 13 1.93251 12.8638C1.69731 12.7439 1.50608 12.5527 1.38624 12.3175C1.25 12.0501 1.25 11.7001 1.25 11V5C1.25 4.29993 1.25 3.9499 1.38624 3.68251C1.50608 3.44731 1.69731 3.25608 1.93251 3.13624C2.1999 3 2.54993 3 3.25 3H3.5C4.90013 3 5.6002 3 6.13498 3.27248C6.60538 3.51217 6.98783 3.89462 7.22752 4.36502C7.5 4.8998 7.5 5.59987 7.5 7M7.5 13V7M7.5 13H11.75C12.4501 13 12.8001 13 13.0675 12.8638C13.3027 12.7439 13.4939 12.5527 13.6138 12.3175C13.75 12.0501 13.75 11.7001 13.75 11V5C13.75 4.29993 13.75 3.9499 13.6138 3.68251C13.4939 3.44731 13.3027 3.25608 13.0675 3.13624C12.8001 3 12.4501 3 11.75 3H11.5C10.0999 3 9.3998 3 8.86502 3.27248C8.39462 3.51217 8.01217 3.89462 7.77248 4.36502C7.5 4.8998 7.5 5.59987 7.5 7"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
];
const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="6"
    viewBox="0 0 11 6"
    fill="none"
  >
    <path
      d="M9.7822 0.344758C9.85186 0.414322 9.90713 0.496938 9.94484 0.587881C9.98254 0.678823 10.002 0.776308 10.002 0.874757C10.002 0.973207 9.98254 1.07069 9.94484 1.16163C9.90713 1.25258 9.85186 1.33519 9.7822 1.40476L5.5322 5.65476C5.46263 5.72442 5.38002 5.77969 5.28907 5.81739C5.19813 5.8551 5.10065 5.87451 5.0022 5.87451C4.90375 5.87451 4.80626 5.8551 4.71532 5.81739C4.62438 5.77969 4.54176 5.72442 4.4722 5.65476L0.222199 1.40476C0.152598 1.33516 0.0973887 1.25253 0.0597214 1.16159C0.0220541 1.07065 0.00266499 0.973187 0.002665 0.874756C0.00266501 0.776326 0.0220542 0.67886 0.0597215 0.587923C0.0973887 0.496985 0.152598 0.414357 0.222199 0.344757C0.2918 0.275156 0.374427 0.219946 0.465365 0.182278C0.556303 0.144611 0.65377 0.125223 0.7522 0.125223C0.850629 0.125223 0.948095 0.144611 1.03903 0.182278C1.12997 0.219946 1.2126 0.275156 1.2822 0.344757L5.0022 4.06376L8.7222 0.344757C8.79176 0.275093 8.87438 0.219826 8.96532 0.182119C9.05627 0.144411 9.15375 0.125003 9.2522 0.125003C9.35065 0.125003 9.44813 0.144412 9.53908 0.182119C9.63002 0.219826 9.71263 0.275094 9.7822 0.344758Z"
      fill="black"
    />
  </svg>
);

const Container = styled("NavigationMenu.Root")`
  display: flex;
  flex-direction: column;
  padding: 0.875rem 1.5rem;
  align-items: flex-start;
  /* gap: 3rem; */
  width: 100%;
  background: var(--background-light, #fafafa);

  @media screen and (max-width: 768px) {
    padding: 0.875rem 1.625rem;

    & > div {
      width: 100%;
    }
  }
`;

const Navbar = styled("NavigationMenu.List")`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
    gap: 0.875rem;

    & > div:last-child {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      & > li:nth-last-child(n + 3) {
        display: none;
      }
    }
  }

  @media screen and (min-width: 769px) {
    & > div:first-child {
      display: none;
    }

    & > div:last-child {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 1.2rem;

      & > li:nth-last-child(-n + 2) {
        display: none;
      }
    }
  }
`;

const NavItem = styled("NavigationMenu.Item")`
  display: flex;
  padding: 0;
  align-items: center;
  gap: 0.0625rem;

  & > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--ui-elements-black, #000);
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      color: var(--ui-elements-black, #000);
      text-decoration: none;
    }
  }
`;

const NavIcon = styled.div`
  display: flex;
  width: 1.5625rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: #7e868c;

  &.active {
    color: #006adc;
  }
`;

const NavText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--ui-elements-black, #000);
  leading-trim: both;
  text-edge: cap;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.00875rem;

  &.active {
    color: #006adc;
  }
`;

const Trigger = styled("NavigationMenu.Trigger")`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ui-elements-black, #000);
  font-family: "Mona Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background: none;
  border: none;

  & > svg {
    transition: transform 0.3s ease-in-out;
  }

  &[data-state="open"] {
    & > svg {
      transform: rotate(-180deg);
    }
  }
`;

const enterFromRight = styled.keyframes`
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const enterFromLeft = styled.keyframes`
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const exitToRight = styled.keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(200px);
  }
`;

const exitToLeft = styled.keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-200px);
  }
`;

const scaleDown = styled.keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const Content = styled("NavigationMenu.Content")`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation-duration: 250ms;
  animation-timing-function: ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8125rem;
  align-self: stretch;
  padding: 0.875rem 0;

  & > ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8125rem;
    align-self: stretch;
    margin: 0;
    padding: 0;
  }

  &[data-motion="from-start"] {
    animation-name: ${enterFromLeft};
  }
  &[data-motion="from-end"] {
    animation-name: ${enterFromRight};
  }
  &[data-motion="to-start"] {
    animation-name: ${exitToLeft};
  }
  &[data-motion="to-end"] {
    animation-name: ${exitToRight};
  }
`;

const Viewport = styled("NavigationMenu.Viewport")`
  position: relative;
  width: var(--radix-navigation-menu-viewport-width);
  height: var(--radix-navigation-menu-viewport-height);
  transition: width, height, 250ms ease;
  overflow: hidden;
  transform-origin: top;
  animation: ${scaleDown} 250ms ease;
`;

const MobileNavItem = styled("NavigationMenu.Item")`
  display: flex;
  padding-right: 0px;
  align-items: center;
  gap: 0.6875rem;
  align-self: stretch;

  & > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--ui-elements-black, #000);
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      color: var(--ui-elements-black, #000);
      text-decoration: none;
    }
  }
`;

const Separator = styled("Separator.Root")`
  width: 100%;
  height: 1px;
  background: #eceef0;
`;

const createNavItem = ({ icon, text, link }) => (
  <NavItem key={text}>
    <NavigationMenu.Link asChild>
      <Link href={`/${ownerId}/widget/Index?tab=${link}`}>
        <NavIcon className={props.tab === link ? "active" : ""}>{icon}</NavIcon>
        <NavText className={props.tab === link ? "active" : ""}>{text}</NavText>
      </Link>
    </NavigationMenu.Link>
  </NavItem>
);

const createMobileNavItem = ({ icon, text, link }) => (
  <MobileNavItem key={text}>
    <NavigationMenu.Link asChild>
      <Link href={`/${ownerId}/widget/Index?tab=${link}`}>
        <NavIcon className={props.tab === link ? "active" : ""}>{icon}</NavIcon>
        <NavText className={props.tab === link ? "active" : ""}>{text}</NavText>
      </Link>
    </NavigationMenu.Link>
  </MobileNavItem>
);

const profileIcon = (
  <Widget
    src={`${ownerId}/widget/Project.Icon`}
    props={{ accountId: context.accountId, size: "1.5em" }}
  />
);

const desktopNav = navItems.map(createNavItem);
const mobileNav = navItems
  .map(createMobileNavItem)
  .reduce((acc, item, index) => {
    if (index === 0) {
      acc.push(item);
      return acc;
    }

    acc.push(<Separator />, item);

    return acc;
  }, []);

State.init({
  isProfile: false,
  isProfileIsFetched: false,
});

if (!state.isProfileIsFetched) {
  if (context.accountId) {
    Near.asyncView(
      ownerId,
      "check_is_project",
      { account_id: context.accountId },
      "final",
      false
    ).then((isProfile) => {
      if (isProfile) {
        State.update({ isProfile: true, isProfileIsFetched: true });
      } else {
        Near.asyncView(
          ownerId,
          "check_is_vendor",
          { account_id: context.accountId },
          "final",
          false
        ).then((isProfile) => {
          State.update({ isProfile: isProfile, isProfileIsFetched: true });
        });
      }
    });
  } else {
    State.update({ isProfile: false, isProfileIsFetched: true });
  }
}

return (
  <Container>
    <Navbar>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="34"
          viewBox="0 0 36 34"
          fill="none"
        >
          <path
            d="M26.4498 32.704L17.999 12.7501L21.1465 33.1912C21.2183 33.6552 21.6398 34 22.1362 34H25.5216C26.2293 34 26.7123 33.3249 26.4498 32.7049V32.704ZM14.8504 33.1902L17.9979 12.7492L9.54715 32.703C9.2846 33.3229 9.76765 33.9981 10.4753 33.9981H13.8607C14.3571 33.9981 14.7786 33.6542 14.8504 33.1893V33.1902ZM32.1982 0H3.79978C1.70144 0 0 1.60696 0 3.58879V30.4102C0 30.7686 0.0564078 31.1154 0.161017 31.4418C0.393824 32.1693 1.39889 32.3485 1.90143 31.7557L18 12.7501L34.0986 31.7557C34.6011 32.3485 35.6062 32.1693 35.839 31.4418C35.9436 31.1154 36 30.7696 36 30.4102V3.58879C36 1.60696 34.2986 0 32.2002 0H32.1982Z"
            fill="#66A0FF"
          />
        </svg>
      </div>
      <div>
        <>{desktopNav}</>
        <>
          <NavigationMenu.Item>
            <Trigger>Explore {arrowDown}</Trigger>
            <Content>
              <ul>{mobileNav}</ul>
            </Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            {state.isProfile ? (
              <>
                <Trigger>
                  {profileIcon} Your profile {arrowDown}
                </Trigger>
                <Content>
                  <ul>
                    <Widget src={`${ownerId}/widget/Sidebar`} />
                  </ul>
                </Content>
              </>
            ) : (
              <Widget src={`${ownerId}/widget/Buttons.Onboard`} />
            )}
          </NavigationMenu.Item>
        </>
      </div>
    </Navbar>

    <Viewport />
  </Container>
);
