'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  User,
  Users,
  Package,
  Video,
  TrendingUp,
  Headphones,
  Disc,
  Bell,
  FileText,
  Settings,
  LogOut,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper for Skite Logo
const SkiteLogo = () => (
  <svg width="121" height="20" viewBox="0 0 121 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1260_313)">
      <path d="M9.25362 20C7.90695 20 6.67186 19.8731 5.54066 19.6191C4.4133 19.369 3.43215 18.9727 2.60876 18.4417C1.78537 17.9069 1.14281 17.2259 0.68879 16.4025C0.304026 15.7099 0.0808638 14.8981 0.0193016 13.9631C6.34545e-05 13.6668 0.234769 13.4129 0.531037 13.4129H4.83269C5.07509 13.4129 5.28671 13.586 5.33288 13.8246C5.44062 14.3632 5.77151 14.7826 6.32173 15.0904C7.0066 15.4714 7.87232 15.6599 8.91118 15.6599C9.21515 15.6599 9.53065 15.6291 9.86155 15.5675C10.1886 15.5021 10.4887 15.4098 10.758 15.2828C11.0274 15.1559 11.239 14.975 11.4044 14.748C11.5699 14.5171 11.6507 14.2517 11.6507 13.9477C11.6507 13.5668 11.3621 13.2782 10.7927 13.0897C10.2232 12.9011 9.50372 12.7165 8.64185 12.5395C7.77613 12.3625 6.83731 12.1508 5.82538 11.9123C4.80961 11.6699 3.87078 11.3121 3.00507 10.8273C2.1432 10.3425 1.42369 9.71145 0.854238 8.92653C0.284788 8.13777 -0.00378418 7.11045 -0.00378418 5.84073C-0.00378418 4.75185 0.25016 3.82842 0.758047 3.07813C1.26593 2.33169 1.94312 1.72761 2.79729 1.27359C3.64762 0.81572 4.62877 0.492519 5.74843 0.300137C6.86809 0.103908 8.03392 0.00771713 9.25362 0.00771713C10.4733 0.00771713 11.5391 0.134689 12.6049 0.388633C13.6707 0.642577 14.6018 1.03119 15.4021 1.55062C16.2024 2.07005 16.8412 2.73569 17.3221 3.54754C17.7223 4.22088 17.957 5.00195 18.0262 5.89075C18.0493 6.19471 17.8223 6.44481 17.5145 6.44481H13.4514C13.2051 6.44481 12.9897 6.27166 12.9397 6.03311C12.8935 5.82149 12.8127 5.62911 12.6973 5.45597C12.5049 5.17894 12.2586 4.95577 11.9547 4.79033C11.6507 4.62488 11.3083 4.5056 10.9273 4.4325C10.5464 4.35554 10.154 4.31707 9.74612 4.31707C8.57644 4.31707 7.71842 4.47482 7.16051 4.79033C6.59876 5.10968 6.38714 5.55985 6.51411 6.14084C6.58721 6.49867 6.9335 6.7834 7.54143 6.99887C8.1532 7.21433 8.8804 7.42211 9.73073 7.62603C10.5811 7.82611 11.4891 8.05697 12.4549 8.31091C13.4168 8.56485 14.3133 8.92268 15.1367 9.37671C15.96 9.83073 16.6449 10.4117 17.1913 11.1081C17.7415 11.8046 18.0108 12.7011 18.0108 13.7899C18.0108 14.8788 17.7877 15.7753 17.3452 16.5525C16.8989 17.3259 16.2832 17.9762 15.4983 18.4956C14.7096 19.015 13.7861 19.3959 12.7203 19.6383C11.6545 19.8769 10.5003 19.9962 9.25362 19.9962V20Z" fill="#5F2EFC" />
      <path d="M48.0262 0.538696V19.4729C48.0262 19.7653 47.7877 20 47.4953 20H41.543C41.2544 20 41.0158 19.7653 41.0158 19.4767L40.9389 5.31746C40.9389 4.78264 40.5041 4.3517 39.9731 4.34785H39.4922C39.2036 4.34016 38.9689 4.10545 38.9689 3.81688V0.538696C38.9689 0.246276 39.2036 0.01157 39.496 0.01157H47.4991C47.7915 0.01157 48.0262 0.246276 48.0262 0.538696Z" fill="#5F2EFC" />
      <path d="M66.3948 0.561805V3.80151C66.3948 4.09393 66.1601 4.32864 65.8677 4.32864H63.3206C61.2775 4.32864 59.6153 5.98312 59.6153 8.02622V16.9604V19.4691C59.6153 19.7615 59.3806 19.9962 59.0882 19.9962H54.0516C53.7592 19.9962 53.5245 19.7615 53.5245 19.4691V6.17166C53.5245 5.15588 52.6972 4.32864 51.6776 4.32864H50.0539C49.7615 4.32864 49.5268 4.09393 49.5268 3.80151V0.561805C49.5268 0.269385 49.7615 0.0346794 50.0539 0.0346794H65.8638C66.1563 0.0346794 66.391 0.269385 66.391 0.561805H66.3948Z" fill="#5F2EFC" />
      <path d="M36.8065 19.9962H30.331C30.1655 19.9962 30.0078 19.9192 29.9077 19.7845L25.987 14.5402C25.683 14.1324 25.0366 14.3478 25.0366 14.8557V19.4421C25.0366 19.7345 24.8019 19.9692 24.5095 19.9692H20.0616C19.7692 19.9692 19.5345 19.7345 19.5345 19.4421V0.527141C19.5345 0.234721 19.7692 1.52588e-05 20.0616 1.52588e-05H24.5095C24.8019 1.52588e-05 25.0366 0.234721 25.0366 0.527141V7.08351C25.0366 7.55292 25.5984 7.78763 25.9331 7.46058C28.0301 5.42518 29.3998 3.06273 30.1001 0.400169C30.1617 0.169311 30.3694 0.0115582 30.608 0.0115582H36.9258C37.326 0.0115582 37.5876 0.446341 37.3875 0.796475C34.7519 5.46365 29.0574 8.50329 26.4218 9.71529C25.9831 9.91921 26.0216 10.5579 26.4872 10.7003C29.8308 11.7199 34.5018 14.0323 37.2721 19.2228C37.4606 19.5729 37.2028 20 36.8065 20V19.9962Z" fill="#5F2EFC" />
      <path d="M72.2278 12.4048C72.2278 12.4048 83.5437 10.531 85.9562 10.1078C86.2178 10.0616 86.4063 9.83075 86.3909 9.56527C86.1524 4.45946 82.0893 0.35403 77.0027 0.0500667C70.9158 -0.311611 65.8715 4.90963 66.441 10.9812C66.5448 12.0893 66.8296 13.1436 67.2644 14.1132C67.2682 14.1247 67.2759 14.1363 67.2797 14.1516C68.8611 17.5068 72.2932 19.8538 76.2947 19.9616C76.3602 19.9654 76.4256 19.9654 76.491 19.9654C76.5025 19.9654 77.0258 19.9654 77.5876 19.9654H78.511C78.6841 19.9654 78.8303 19.8654 78.9034 19.7192C78.9342 19.6615 78.9496 19.5922 78.9496 19.5229V16.2794C78.9535 16.0216 78.738 15.8177 78.4764 15.8292C75.229 16.0101 72.8704 14.6211 71.92 13.032C71.7661 12.7742 71.9277 12.4471 72.224 12.3971L72.2278 12.4048ZM71.7161 8.2032C71.3967 8.25322 71.1274 7.94926 71.212 7.6376C71.8123 5.40213 73.4013 4.37865 75.8831 4.07854C77.7415 3.85153 79.8615 4.81344 80.8503 6.19089C81.0427 6.46023 80.8734 6.84114 80.5464 6.89116L71.7161 8.2032Z" fill="#5F2EFC" />
      <path d="M86.3949 17.8954C86.3949 18.8611 85.7254 19.673 84.8135 19.9039C84.725 19.9269 84.6288 19.9423 84.5365 19.9539C84.4557 19.9654 84.371 19.9693 84.2864 19.9693C83.4322 19.9693 82.6973 19.4691 82.3664 18.7496C82.3664 18.7496 82.3664 18.7457 82.3664 18.7419C82.2471 18.4841 82.1817 18.1994 82.1817 17.8992C82.1817 16.7565 83.1244 15.8292 84.2902 15.8292C85.456 15.8292 86.3987 16.7565 86.3987 17.8954H86.3949Z" fill="#5F2EFC" />
    </g>
    <defs>
      <clipPath id="clip0_1260_313">
        <rect width="86.3948" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CollapseIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 4V20M4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6Z" stroke="#2B2834" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 10L13 12L15 14" stroke="#2B2834" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CreatorsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.25 8.25C9.49264 8.25 10.5 7.24264 10.5 6C10.5 4.75736 9.49264 3.75 8.25 3.75C7.00736 3.75 6 4.75736 6 6C6 7.24264 7.00736 8.25 8.25 8.25Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.25 15.75C12.3921 15.75 15.75 12.3921 15.75 8.25C15.75 4.10786 12.3921 0.75 8.25 0.75C4.10786 0.75 0.75 4.10786 0.75 8.25C0.75 12.3921 4.10786 15.75 8.25 15.75Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12.7275 14.25C12.6075 12.081 11.9438 10.5 8.25001 10.5C4.55626 10.5 3.89251 12.081 3.77251 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UsersIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 7.5C10.6569 7.5 12 6.15685 12 4.5C12 2.84315 10.6569 1.5 9 1.5C7.34315 1.5 6 2.84315 6 4.5C6 6.15685 7.34315 7.5 9 7.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.5 6.75C14.7427 6.75 15.75 5.91 15.75 4.875C15.75 3.84 14.7427 3 13.5 3M4.5 6.75C3.25725 6.75 2.25 5.91 2.25 4.875C2.25 3.84 3.25725 3 4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 15.75C11.4853 15.75 13.5 14.4069 13.5 12.75C13.5 11.0931 11.4853 9.75 9 9.75C6.51472 9.75 4.5 11.0931 4.5 12.75C4.5 14.4069 6.51472 15.75 9 15.75Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 14.25C16.3155 13.9613 17.25 13.2308 17.25 12.375C17.25 11.5192 16.3155 10.7887 15 10.5M3 14.25C1.6845 13.9613 0.75 13.2308 0.75 12.375C0.75 11.5192 1.6845 10.7887 3 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PackageIcon = ({ size = 18 }: { size?: number }) => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 4.875L12 6.375M12 6.375L11.625 6.5625L8.25 8.25M12 6.375V9M12 6.375L4.875 2.625M8.25 8.25L1.5 4.875M8.25 8.25V15.375M10.9335 1.7865L12.4335 2.574C14.0467 3.42075 14.8537 3.84375 15.3022 4.605C15.75 5.3655 15.75 6.31275 15.75 8.2065V8.29425C15.75 10.1872 15.75 11.1345 15.3022 11.895C14.8537 12.6563 14.0467 13.08 12.4335 13.9268L10.9335 14.7135C9.6165 15.4043 8.958 15.75 8.25 15.75C7.542 15.75 6.8835 15.405 5.5665 14.7135L4.0665 13.926C2.45325 13.0793 1.64625 12.6563 1.19775 11.895C0.75 11.1345 0.75 10.1873 0.75 8.295V8.20725C0.75 6.3135 0.75 5.36625 1.19775 4.60575C1.64625 3.8445 2.45325 3.42075 4.0665 2.57475L5.5665 1.78725C6.8835 1.09575 7.542 0.75 8.25 0.75C8.958 0.75 9.6165 1.095 10.9335 1.7865Z" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" />
  </svg>
);

const VideoIcon = ({ size = 18 }: { size?: number }) => (
  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9035 11.319C10.0733 12 8.841 12 6.375 12C3.90975 12 2.67675 12 1.8465 11.319C1.69474 11.1944 1.55557 11.0553 1.431 10.9035C0.75 10.0725 0.75 8.841 0.75 6.375C0.75 3.90975 0.75 2.67675 1.431 1.8465C1.55557 1.69474 1.69474 1.55557 1.8465 1.431C2.6775 0.75 3.909 0.75 6.375 0.75C8.84025 0.75 10.0733 0.75 10.9035 1.431C11.0553 1.55557 11.1944 1.69474 11.319 1.8465C12 2.6775 12 3.909 12 6.375C12 8.84025 12 10.0733 11.319 10.9035C11.1944 11.0553 11.0553 11.1944 10.9035 11.319ZM12 7.125V5.625L13.95 3.02475C14.0758 2.85669 14.2514 2.73251 14.4518 2.66984C14.6522 2.60716 14.8672 2.60916 15.0664 2.67555C15.2656 2.74195 15.4388 2.86937 15.5615 3.03974C15.6842 3.21011 15.7502 3.41479 15.75 3.62475V9.12525C15.7502 9.33521 15.6842 9.53989 15.5615 9.71026C15.4388 9.88063 15.2656 10.0081 15.0664 10.0744C14.8672 10.1408 14.6522 10.1428 14.4518 10.0802C14.2514 10.0175 14.0758 9.89331 13.95 9.72525L12 7.125Z" stroke="#5F5971" stroke-width="1.5" stroke-linejoin="round" />
    <path d="M6.375 7.5C6.67337 7.5 6.95952 7.38147 7.1705 7.1705C7.38147 6.95952 7.5 6.67337 7.5 6.375C7.5 6.07663 7.38147 5.79048 7.1705 5.5795C6.95952 5.36853 6.67337 5.25 6.375 5.25M6.375 7.5C6.07663 7.5 5.79048 7.38147 5.5795 7.1705C5.36853 6.95952 5.25 6.67337 5.25 6.375C5.25 6.07663 5.36853 5.79048 5.5795 5.5795C5.79048 5.36853 6.07663 5.25 6.375 5.25M6.375 7.5V5.25" stroke="#5F5971" stroke-width="1.5" stroke-linejoin="round" />
  </svg>
);

const TrendingUpIcon = ({ size = 18 }: { size?: number }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 5.25C1.5 4.85218 1.65804 4.47064 1.93934 4.18934C2.22064 3.90804 2.60218 3.75 3 3.75H15C15.3978 3.75 15.7794 3.90804 16.0607 4.18934C16.342 4.47064 16.5 4.85218 16.5 5.25V12.75C16.5 13.1478 16.342 13.5294 16.0607 13.8107C15.7794 14.092 15.3978 14.25 15 14.25H3C2.60218 14.25 2.22064 14.092 1.93934 13.8107C1.65804 13.5294 1.5 13.1478 1.5 12.75V5.25Z" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1.5 6.75C2.29565 6.75 3.05871 6.43393 3.62132 5.87132C4.18393 5.30871 4.5 4.54565 4.5 3.75M13.5 14.25C13.5 13.4544 13.8161 12.6913 14.3787 12.1287C14.9413 11.5661 15.7044 11.25 16.5 11.25" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const HeadphonesIcon = ({ size = 18 }: { size?: number }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.75 8.10375C12.75 7.84425 12.75 7.7145 12.789 7.599C12.9023 7.263 13.2015 7.13325 13.5015 6.99675C13.8375 6.843 14.0055 6.7665 14.1728 6.753C14.3618 6.738 14.5515 6.7785 14.7135 6.86925C14.928 6.98925 15.078 7.21875 15.231 7.40475C15.9383 8.26425 16.2923 8.694 16.4213 9.16725C16.5263 9.54975 16.5263 9.95025 16.4213 10.332C16.233 11.0235 15.6368 11.6025 15.195 12.1395C14.9693 12.4132 14.856 12.5505 14.7135 12.6307C14.5487 12.7221 14.3605 12.7626 14.1728 12.747C14.0055 12.7335 13.8375 12.657 13.5008 12.5032C13.2008 12.3667 12.9023 12.237 12.789 11.901C12.75 11.7855 12.75 11.6557 12.75 11.3962V8.10375ZM5.25001 8.10375C5.25001 7.77675 5.24101 7.4835 4.97701 7.254C4.88101 7.17075 4.75351 7.113 4.49926 6.99675C4.16251 6.84375 3.99451 6.7665 3.82726 6.753C3.32701 6.7125 3.05776 7.0545 2.76976 7.4055C2.06176 8.26425 1.70776 8.694 1.57801 9.168C1.47361 9.54923 1.47361 9.95152 1.57801 10.3327C1.76701 11.0235 2.36401 11.6032 2.80501 12.1395C3.08326 12.477 3.34951 12.7852 3.82726 12.747C3.99451 12.7335 4.16251 12.657 4.49926 12.5032C4.75426 12.3877 4.88101 12.3292 4.97701 12.246C5.24101 12.0165 5.25001 11.7232 5.25001 11.397V8.10375Z" stroke="#5F5971" stroke-width="1.5" />
    <path d="M3.75 6.75C3.75 4.2645 6.1005 2.25 9 2.25C11.8995 2.25 14.25 4.2645 14.25 6.75" stroke="#5F5971" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
    <path d="M14.25 12.75V13.35C14.25 14.6752 12.9075 15.75 11.25 15.75H9.75" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);

const DiscIcon = ({ size = 18 }: { size?: number }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375Z" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9 12.75C11.0711 12.75 12.75 11.0711 12.75 9C12.75 6.92893 11.0711 5.25 9 5.25C6.92893 5.25 5.25 6.92893 5.25 9C5.25 11.0711 6.92893 12.75 9 12.75Z" fill="#5F5971" />
  </svg>

);

const BellIcon = ({ size = 18 }: { size?: number }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.25 14.25C11.25 14.8467 11.013 15.419 10.591 15.841C10.169 16.263 9.59674 16.5 9.00001 16.5C8.40327 16.5 7.83097 16.263 7.40902 15.841C6.98706 15.419 6.75001 14.8467 6.75001 14.25M9.54076 3.75226L8.44126 3.75001C5.93326 3.74401 3.75601 5.78176 3.73876 8.25001V11.0925C3.73876 11.685 3.66376 12.2633 3.34051 12.756L3.12526 13.0845C2.79751 13.5825 3.15001 14.25 3.73876 14.25H14.2613C14.85 14.25 15.2018 13.5825 14.8748 13.0845L14.6595 12.756C14.337 12.2633 14.2613 11.6843 14.2613 11.0918V8.25076C14.2313 5.78176 12.0488 3.75826 9.54076 3.75226Z" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9 1.5C9.39782 1.5 9.77936 1.65804 10.0607 1.93934C10.342 2.22064 10.5 2.60218 10.5 3V3.75H7.5V3C7.5 2.60218 7.65804 2.22064 7.93934 1.93934C8.22064 1.65804 8.60218 1.5 9 1.5Z" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const FileTextIcon = ({ size = 18 }: { size?: number }) => (
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.75 0.75H1.5M0.75 6H1.5M0.75 11.25H1.5M4.5 0.75H5.25M4.5 6H5.25M4.5 11.25H5.25M8.25 0.75H14.25M8.25 6H14.25M8.25 11.25H14.25" stroke="#5F5971" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);

const SettingsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.14489 0.864C8.86964 0.75 8.52014 0.75 7.82114 0.75C7.12214 0.75 6.77264 0.75 6.49739 0.864C6.31527 0.939385 6.1498 1.04992 6.01043 1.18929C5.87106 1.32866 5.76052 1.49414 5.68514 1.67625C5.61614 1.8435 5.58839 2.03925 5.57789 2.3235C5.57301 2.52895 5.51609 2.7298 5.41247 2.90727C5.30885 3.08473 5.16191 3.23302 4.98539 3.33825C4.80599 3.43858 4.60408 3.49175 4.39854 3.4928C4.193 3.49385 3.99055 3.44274 3.81014 3.34425C3.55814 3.21075 3.37589 3.13725 3.19514 3.11325C2.80088 3.0614 2.40216 3.16823 2.08664 3.41025C1.85114 3.5925 1.67564 3.89475 1.32614 4.5C0.976639 5.10525 0.801139 5.4075 0.762889 5.70375C0.737115 5.89909 0.750079 6.09759 0.801039 6.28792C0.851999 6.47825 0.939957 6.65667 1.05989 6.813C1.17089 6.957 1.32614 7.07775 1.56689 7.22925C1.92164 7.452 2.14964 7.8315 2.14964 8.25C2.14964 8.6685 1.92164 9.048 1.56689 9.27C1.32614 9.42225 1.17014 9.543 1.05989 9.687C0.939957 9.84333 0.851999 10.0218 0.801039 10.2121C0.750079 10.4024 0.737115 10.6009 0.762889 10.7963C0.801889 11.0918 0.976639 11.3948 1.32539 12C1.67564 12.6052 1.85039 12.9075 2.08664 13.0897C2.24297 13.2097 2.42139 13.2976 2.61172 13.3486C2.80205 13.3996 3.00055 13.4125 3.19589 13.3868C3.37589 13.3628 3.55814 13.2893 3.81014 13.1558C3.99055 13.0573 4.193 13.0061 4.39854 13.0072C4.60408 13.0082 4.80599 13.0614 4.98539 13.1617C5.34764 13.3717 5.56289 13.758 5.57789 14.1765C5.58839 14.4615 5.61539 14.6565 5.68514 14.8237C5.76052 15.0059 5.87106 15.1713 6.01043 15.3107C6.1498 15.4501 6.31527 15.5606 6.49739 15.636C6.77264 15.75 7.12214 15.75 7.82114 15.75C8.52014 15.75 8.86964 15.75 9.14489 15.636C9.327 15.5606 9.49247 15.4501 9.63185 15.3107C9.77122 15.1713 9.88175 15.0059 9.95714 14.8237C10.0261 14.6565 10.0539 14.4615 10.0644 14.1765C10.0794 13.758 10.2946 13.371 10.6569 13.1617C10.8363 13.0614 11.0382 13.0082 11.2437 13.0072C11.4493 13.0061 11.6517 13.0573 11.8321 13.1558C12.0841 13.2893 12.2664 13.3628 12.4464 13.3868C12.6417 13.4125 12.8402 13.3996 13.0306 13.3486C13.2209 13.2976 13.3993 13.2097 13.5556 13.0897C13.7919 12.9082 13.9666 12.6052 14.3161 12C14.6656 11.3948 14.8411 11.0925 14.8794 10.7963C14.9052 10.6009 14.8922 10.4024 14.8412 10.2121C14.7903 10.0218 14.7023 9.84333 14.5824 9.687C14.4714 9.543 14.3161 9.42225 14.0754 9.27075C13.8998 9.1638 13.7543 9.01405 13.6524 8.83553C13.5504 8.65701 13.4955 8.45555 13.4926 8.25C13.4926 7.8315 13.7206 7.452 14.0754 7.23C14.3161 7.07775 14.4721 6.957 14.5824 6.813C14.7023 6.65667 14.7903 6.47825 14.8412 6.28792C14.8922 6.09759 14.9052 5.89909 14.8794 5.70375C14.8404 5.40825 14.6656 5.10525 14.3169 4.5C13.9666 3.89475 13.7919 3.5925 13.5556 3.41025C13.3993 3.29032 13.2209 3.20236 13.0306 3.1514C12.8402 3.10044 12.6417 3.08748 12.4464 3.11325C12.2664 3.13725 12.0841 3.21075 11.8314 3.34425C11.6511 3.44261 11.4488 3.49365 11.2434 3.4926C11.038 3.49155 10.8362 3.43844 10.6569 3.33825C10.4804 3.23302 10.3334 3.08473 10.2298 2.90727C10.1262 2.7298 10.0693 2.52895 10.0644 2.3235C10.0539 2.0385 10.0269 1.8435 9.95714 1.67625C9.88175 1.49414 9.77122 1.32866 9.63185 1.18929C9.49247 1.04992 9.327 0.939385 9.14489 0.864Z" stroke="#5F5971" stroke-width="1.5" />
  </svg>
);


type SidebarProps = {
  activePage?: string;
};

export default function Sidebar({ activePage = 'dashboard' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Width calculation
  const sidebarWidth = isCollapsed ? '88px' : '210px';
  const contentWidth = isCollapsed ? '100%' : '162px';
  const paddingX = isCollapsed ? '12px' : '24px'; // Reduce padding when collapsed to center items

  return (
    <aside
      style={{
        width: sidebarWidth,
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #EBEBEB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `24px ${paddingX}`,
        gap: '53px',
        boxSizing: 'border-box',
        transition: 'width 0.3s ease, padding 0.3s ease'
      }}
    >
      {/* Top Section: Logo + Navigation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', alignItems: isCollapsed ? 'center' : 'flex-start' }}>

        {/* Logo */}
        <div style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', width: '100%' }}>
          {/* Logo Container - Clip for collapsed state */}
          <div style={{
            width: isCollapsed ? '20px' : '121px',
            overflow: 'hidden',
            transition: 'width 0.3s ease',
            display: isCollapsed ? 'none' : 'block' // Ideally we show icon, but for now specific request was "close". 
            // Actually let's try to keep the icon visible if possible or just hide it if it looks bad.
            // User requested "close", implies hiding or shrinking.
            // Let's hide the logo entirely in collapsed mode and just keep the toggle button? 
            // Or keep the toggle button centered.
          }}>
            <SkiteLogo />
          </div>
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              cursor: 'pointer',
              transform: isCollapsed ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease',
              // If collapsed, this is the only thing visible in the header
            }}
          >
            <CollapseIcon />
          </div>
        </div>

        {/* Navigation Groups Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: contentWidth }}>

          {/* Main Group */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: isCollapsed ? 'center' : 'flex-start' }}>
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" isActive={activePage === 'dashboard'} isCollapsed={isCollapsed} />
            <NavItem icon={<CreatorsIcon size={18} />} label="Creators" isActive={activePage === 'creators'} isCollapsed={isCollapsed} />
            <NavItem icon={<UsersIcon size={18} />} label="Users" isActive={activePage === 'users'} isCollapsed={isCollapsed} />
            <NavItem icon={<PackageIcon size={18} />} label="Products" isActive={activePage === 'products'} isCollapsed={isCollapsed} />
            <NavItem icon={<VideoIcon size={18} />} label="Events & Live" isActive={activePage === 'events'} isCollapsed={isCollapsed} />
          </div>

          {/* Operations Group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', alignItems: isCollapsed ? 'center' : 'flex-start' }}>
            {!isCollapsed && (
              <div style={{ fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '12px', color: '#A5A1AF', marginBottom: '4px', width: '100%' }}>OPERATIONS</div>
            )}
            <NavItem icon={<TrendingUpIcon size={18} />} label="Revenue" isActive={activePage === 'revenue'} isCollapsed={isCollapsed} />
            <NavItem icon={<HeadphonesIcon size={18} />} label="Support Center" isActive={activePage === 'support'} isCollapsed={isCollapsed} />
            <NavItem icon={<DiscIcon size={18} />} label="Live Tools" isActive={activePage === 'live'} isCollapsed={isCollapsed} />
          </div>

          {/* System Group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', alignItems: isCollapsed ? 'center' : 'flex-start' }}>
            {!isCollapsed && (
              <div style={{ fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '12px', color: '#A5A1AF', marginBottom: '4px', width: '100%' }}>SYSTEM</div>
            )}
            <NavItem icon={<BellIcon size={18} />} label="Notifications" isActive={activePage === 'notifications'} isCollapsed={isCollapsed} />
            <NavItem icon={<FileTextIcon size={18} />} label="Logs" isActive={activePage === 'logs'} isCollapsed={isCollapsed} />
            <NavItem icon={<SettingsIcon size={18} />} label="Settings" isActive={activePage === 'settings'} isCollapsed={isCollapsed} />
          </div>

        </div>
      </div>

      {/* Bottom Section: User Profile */}
      <div style={{
        width: '100%',
        height: isCollapsed ? 'auto' : '108px',
        padding: isCollapsed ? '12px' : '16px',
        gap: '4px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #EBEBEB',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        alignItems: isCollapsed ? 'center' : 'flex-start'
      }}>
        {/* User Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: isCollapsed ? 'auto' : '76px', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '30px', justifyContent: isCollapsed ? 'center' : 'flex-start', width: '100%' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '100px', backgroundColor: '#eee', overflow: 'hidden', flexShrink: 0 }}>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="User" />
            </div>
            {!isCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <span style={{ fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '13.5px', lineHeight: '16px', color: '#2B2834' }}>User Name</span>
                <span style={{ fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '10px', lineHeight: '12px', color: '#5F5971' }}>Super Admin (HQ)</span>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button style={{
            width: isCollapsed ? '34px' : '130px',
            height: '34px',
            padding: isCollapsed ? '8px' : '8px',
            gap: '8px',
            backgroundColor: '#F9F9FB',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            border: 'none',
            cursor: 'pointer'
          }}>
            <LogOut size={18} color="#CD110A" />
            {!isCollapsed && (
              <span style={{ fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '13.5px', lineHeight: '16px', color: '#2B2834' }}>Log Out</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, isActive, isCollapsed }: { icon: ReactNode; label: string; isActive: boolean; isCollapsed: boolean }) {
  const activeStyle = isActive ? {
    color: '#5F2EFC',
    fontWeight: 500,
  } : {
    color: '#5F5971',
    fontWeight: 500,
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: isCollapsed ? 'center' : 'flex-start',
      gap: '8px',
      padding: '8px 0px',
      height: '34px',
      cursor: 'pointer',
      width: '100%',
      ...activeStyle
    }}>
      <span style={{ color: isActive ? '#5F2EFC' : 'currentColor', display: 'flex', alignItems: 'center' }}>{icon}</span>
      {!isCollapsed && (
        <span style={{
          fontFamily: 'Neue Montreal',
          fontSize: '13.5px',
          lineHeight: '16px',
          color: isActive ? '#5F2EFC' : '#5F5971',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}>{label}</span>
      )}
      {isActive && !isCollapsed && (
        // Optional active indicator logic
        null
      )}
    </div>
  );
}
