import { useContext, createContext, useState, useEffect } from "react";
const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const avatars = [maulie, sarah];

  const value = { avatars };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

const sarah = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="59"
    height="59"
    fill="none"
    viewBox="0 0 59 59"
  >
    <path
      fill="#F3A13B"
      d="M45.66 77.296C35.207 92.528 21.08 108.711-2.582 121.43c-23.66 12.719-57.006 21.944-71.747 8.673-14.773-13.117-10.727-48.914-8.122-76.65 2.605-27.584 3.954-47.076 12.075-63.259 8.122-15.998 22.894-28.717 38.28-30.066C-16.894-41.25-1.11-31.075 23.47-30.86c24.61.215 58.017-9.531 67.242-.46 9.225 9.072-5.885 36.962-16.795 57.956-10.88 20.963-17.807 35.399-28.258 50.661z"
    ></path>
    <path
      fill="#F45B49"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M92.889-33.589C90.774-35.703 71.987-22.31 71.987-22.31s-11.8 33.56-14.711 40.118c-2.943 6.62-13.608 24.028-13.608 24.028s-21.546-1.41-31.752 7.54c-5.976 5.24-12.964 24.61-12.964 24.61s-9.685 1.778-15.079-3.157c-3.095-2.82-6.467-11.063-8.673-14.894-1.655-2.82-2.575-1.778-2.575-1.778l2.299 15.201-5.517-1.164 6.1 9.807S-4.175 95.654 3.824 90.383c8-5.271 14.19-14.62 14.19-14.62l.03 22.405 37.667-12.474.43-24.304s12.994-20.381 18.91-41.957c2.788-10.237 6.006-31.016 6.006-31.016s12.352-3.862 13.884-13.21c.98-6.037.49-6.252-2.053-8.796z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M21.784 25.47c-2.973-9.623.95-17.04 14.68-15.293 1.594.215 3.495.399 4.935 1.226 6.498 3.8 5.272 8.214 6.068 9.103 2.33 2.666 3.433 12.933 4.414 15.814l-32.18-.337 2.083-10.512z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#F45B49"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M38.64 31.968l-.122 8.459 2.145 2.482s1.042 8.428-2.298 10.39c-3.647 2.176-11.861-2.084-14.65-2.79-2.513-.643 1.502-5.914 1.502-5.914l.276-9.716-.246-3.77 13.394.859z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#F45B49"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M40.357 26.941c.583-2.114.368-6.344-.153-8.275-.95-3.494-1.93-1.961-5.486-2.942-3.954-1.103-5.885-2.666-8.459.49-1.011 1.227-3.984 5.824-4.444 7.479-1.624 5.915 1.502 11.952 6.988 13.485 3.524.98 6.405.674 8.98-1.839 1.502-1.38 1.992-6.283 2.574-8.398z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FAFCFF"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M32.389 26.39c.276-.828-.49-1.808-1.686-2.207-1.195-.398-2.39-.061-2.666.766-.276.828.49 1.809 1.685 2.207 1.226.399 2.39.061 2.667-.766zM25.248 23.11c.276-.827-.49-1.808-1.686-2.206-1.195-.399-2.39-.062-2.666.766-.276.827.49 1.808 1.686 2.206 1.226.399 2.39.031 2.666-.766z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FB564C"
      fillRule="evenodd"
      d="M37.415 41.407l.858-8.642s-6.957-1.533-8.643.275c-1.655 1.809.092 7.754.092 7.754l4.2.644"
      clipRule="evenodd"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M44.555 26.053c-1.655 2.942-4.444-3.678-4.444-3.678l-11.247-2.667-.797-5.73-2.636 6.405-4.015-.092s3.187-7.969 3.984-8.735c3.28-3.126 8.858-2.973 12.474.03 3.034 2.514 10.114 8.398 6.681 14.467z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#F45B49"
      fillRule="evenodd"
      d="M39.254 27.555c.797-.95 2.36 0 2.666.919.613 1.9-.827 5.118-3.8 3.187"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M39.254 27.555c.797-.95 2.36 0 2.666.919.613 1.9-.827 5.118-3.8 3.187"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M28.65 26.727c.582.368 1.287.276 1.594-.184.306-.46.06-1.134-.521-1.502-.583-.368-1.288-.276-1.594.184-.307.46-.062 1.134.52 1.502zM23.01 23.203c.368-.583.276-1.502-1.256-1.778-.552-.092-.49.184-.889.735-.368.583.123 1.196.583 1.502.49.307 1.195.123 1.563-.46z"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M40.05 29.424c-.06.061-.122.123-.152.215"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M31.714 29.485c-.766 1.625-3.003 1.073-4.566 1.625 0 0 1.225 2.697 3.892 1.287 1.747-.95.674-2.912.674-2.912z"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#FAF6EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M26.749 25.593c0-2.33 2.023-4.199 4.536-4.199 2.513 0 4.536 1.87 4.536 4.2 0 2.328-2.023 4.198-4.536 4.198-2.513 0-4.536-1.87-4.536-4.199zM17.738 22.865c0-2.329 2.023-4.198 4.536-4.198 2.513 0 4.536 1.869 4.536 4.198 0 2.33-2.023 4.2-4.536 4.2-2.513 0-4.536-1.901-4.536-4.2z"
    ></path>
    <path
      fill="#F45B49"
      fillRule="evenodd"
      d="M25.922 25.869c-2.054-.368-3.862-1.808-4.506-.766-.827 1.348 1.87 3.555 2.3 3.677"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M25.922 25.869c-2.054-.368-3.862-1.808-4.506-.766-.827 1.348 1.87 3.555 2.3 3.677"
    ></path>
    <path
      stroke="#FAF6EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.13"
      d="M29.078 12.506c1.839 0 1.808 5.609 2.146 7.662M36.434 10.054c6.742 6.437 6.13 15.478 6.987 20.136M45.843 22.834c.643 3.556 1.47 7.08 2.237 10.635"
    ></path>
  </svg>
);

const maulie = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="38"
    width="100%"
    height="100%"
    // height="38"
    fill="none"
    viewBox="0 0 38 38"
  >
    <path
      fill="#49574E"
      fillRule="evenodd"
      d="M25.016-2.198c3.16.66 6.744.408 9.477 1.96 2.945 1.708 6.918 4.639 8.76 7.317 3.526 5.103 4.069 10.906 6.976 16.3 8.623 16.07 9.534 28.411 2.887 45.256-4.089 10.343-7.752 18.106-17.053 25.305-3.876 3.008-7.752 7.433-12.946 8.714-3.914.97-17.829-.117-22.092-.835-11.279-1.94-19.282-13.487-18.623-23.326.348-5.336 4.573-10.15 1.589-15.466-4.942-8.791-18.876-4.658-23.372-13.779-1.938-3.94-.755-8.286 0-12.361C-36.396 20.914-21.377 7.35-4.963.907-2.928.112-.74-.8 1.529-1.635c7.538-2.833 15.813-2.988 23.487-.563z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      d="M19.614 13.184c-1.767-.789-1.303-3.999 1.09-5.774 2.391-1.775 6.247-.161 7.229-.215 5.551-.27 7.461 4.913 5.64 10.616-.535 1.65-4.98 5.828-6.8 4.735-1.84-1.112 1.749-6.42.178-7.64"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M19.614 13.184c-1.767-.789-1.303-3.999 1.09-5.774 2.391-1.775 6.247-.161 7.229-.215 5.551-.27 7.461 4.913 5.64 10.616-.535 1.65-4.98 5.828-6.8 4.735-1.84-1.112 1.749-6.42.178-7.64"
    ></path>
    <path
      fill="#FAF6EB"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M28.801 19.768l.687 5.797 2.023 2.59s-1.933 2.663-5.33 2.264c-3.396-.38-4.426-2.518-4.426-2.518l-.253-7.535 7.3-.598z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FAF6EB"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M31.444 17.853c.513-3.787-1.946-7.247-5.488-7.702-1.762-.236-3.523-1.493-4.845-.419-1.34 1.093-2.239 4.534-2.496 6.428-.513 3.787 1.836 6.954 5.378 7.428 1.927.255 3.927.674 5.303-.601 1.157-1.074 1.927-3.386 2.148-5.134z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FAF6EB"
      fillRule="evenodd"
      d="M20.365 15.219c-.755.998-2.801 2.867-2.466 3.52.453.852 2.18-.11 2.348-.309"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M20.365 15.219c-.755.998-2.801 2.867-2.466 3.52.453.852 2.18-.11 2.348-.309"
    ></path>
    <path
      fill="#FAFCFF"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M25.818 14.579c-.07-.488-.736-.808-1.49-.707-.754.101-1.297.589-1.227 1.077.07.487.736.807 1.49.706.754-.1 1.297-.589 1.227-1.076zM20.587 14.676c-.056-.544-.635-.906-1.252-.805-.636.1-1.084.644-1.01 1.208.057.543.636.906 1.253.805.617-.12 1.066-.644 1.01-1.208z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FAF6EB"
      fillRule="evenodd"
      d="M28.597 25.435l.184-4.367s-3.627-1.004-4.511.211c-.884 1.215.718 4.596.718 4.596l2.67.035"
      clipRule="evenodd"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      d="M20.16 9.275c-.55.4-.312-1.034-.532-.363-.734 2.143.99 2.996 2.658 2.978 1.595 0 3.19-.436 3.19-.436s2.677 4.539 5.153 3.65c1.631-.582 2.346-2.633 1.301-3.868-.861-1.017-2.035-1.597-3.3-1.96-1.283-.364-2.732-.218-3.979-.654"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M20.16 9.275c-.55.4-.312-1.034-.532-.363-.734 2.143.99 2.996 2.658 2.978 1.595 0 3.19-.436 3.19-.436s2.677 4.539 5.153 3.65c1.631-.582 2.346-2.633 1.301-3.868-.861-1.017-2.035-1.597-3.3-1.96-1.283-.364-2.732-.218-3.979-.654"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      d="M18.939 9.987c-2.124-4.969 1.724-6.601 3.612-4.57.073-2.974 5.41-4.388 6.39.49.454-.798 4.011 1.614 0 3.68"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M18.939 9.987c-2.124-4.969 1.724-6.601 3.612-4.57.073-2.974 5.41-4.388 6.39.49.454-.798 4.011 1.614 0 3.68"
    ></path>
    <path
      fill="#FAF6EB"
      fillRule="evenodd"
      d="M30.175 15.256c-.2.035.688-.818 1.738.366.742.835-.037 3.203-1.738 2.385"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M30.175 15.256c-.2.035.688-.818 1.738.366.742.835-.037 3.203-1.738 2.385"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M30.829 16.356l-.032.18-.065.262-.13.24"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M23.323 15.03c-.016-.38.224-.701.544-.72.32-.02.592.265.592.643.016.38-.224.7-.544.72-.304.019-.576-.265-.592-.644zM18.546 15.13a.555.555 0 01.527-.593.596.596 0 01.608.542c.02.322-.223.577-.547.594-.304.017-.568-.238-.588-.543z"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#FAF6EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M20.365 11.579c-.763-.193-1.084-1.033-1.365-1.592"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M25.824 23.848l-4.095-1.122.17 3.184s1.235-.343 2.284-.977c1.032-.633 1.641-1.085 1.641-1.085z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#F3A140"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M31.696 26.868s9.86 2.985 11.413 9.405c1.553 6.44-5.2 16.314-5.2 16.314L26.332 68.45 1.484 63.874s2.763-26.425 5.454-31.779c.813-1.627 1.517-4.612 3.973-5.86 2.366-1.193 6.483-.687 6.483-.687l4.64-1.23 1.41 4.467 6.121-3.508 2.131 1.591z"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M23.094 29.095c-2.304 8.418-5.047 16.745-7.04 25.254-.842 3.602-1.317 7.367-2.286 10.916M30.146 26.82c-1.785 6.834.98 6.272-5.004 3.607M18.927 25.91c-1.269 4.48-3.641 5.716 2.575 3.422M24.687 18.176c-.051 1.96-1.592 1.773-1.592 1.213M18.772 37.626a.577.577 0 00-.569-.57.577.577 0 00-.568.57c0 .308.261.568.568.568.308 0 .57-.26.57-.568z"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M30.308 67.045s1.05-11.55-6.836-16.483c-7.886-4.934-12.606-14.188-12.606-14.188S.25 47.381-3.295 52.532c-3.545 5.15-4.847 18.344-4.847 18.344s5.606 3.253 6.98 6.85c1.357 3.542-.108 8.06-2.151 9.976l-4.974 2.043s-1.7 15.163 3.979 24.163c5.679 9.001 14.342 12.706 30.927 6.561 14.722-5.458 7.831-35.26 7.831-35.26s-5.914-1.14-7.65-5.875c-3.509-9.434 3.508-12.29 3.508-12.29z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M33.917 66.746s1.055-11.574-6.873-16.519c-7.928-4.945-15.22-12.715-15.22-12.715S3.698 47.022.134 52.202C-3.431 57.362-4.74 70.584-4.74 70.584s5.637 3.26 7.018 6.865C3.642 81 2.17 85.528.115 87.448l-5 2.029s.472 15.07 6.182 24.09c5.71 9.02 12.237 12.86 28.91 6.701 14.802-5.47 7.874-35.337 7.874-35.337s-5.946-1.141-7.691-5.887c-3.51-9.455 3.527-12.298 3.527-12.298z"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#FAF6EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M11.72 38.006c.036-.399-1.86 2.342-2.316 2.796-2.116 2.105-3.538 4.61-5.417 6.88-5.307 6.407-8.444 15.083-9.1 23.27"
    ></path>
    <path
      fill="#1C2628"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M21.73 97.748L11.836-.426s-.18-5.792-2.582-7.059C6.853-8.752 7.882-9.404 7.882-9.404s5.868-4.579 1.896-6.932c-3.972-2.335-6.355-.923-7.15 1.285-.794 2.208-.27 5.231-.27 5.231L-1.02-8.77l.74 2.642 3.305-1.05.577 2.408-3.972 1.828L.985.66 5.03-1.096 15.32 99.16l6.41-1.411z"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#FAF6EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M20.137 98.932l-8.629-85.883-.925-9.204M18.773 99.387l-9.098-86.27-.911-9.045M16.953 99.614l-9.12-86.456-.89-8.858"
    ></path>
    <path
      fill="#F3A140"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M43.041 61.966C40.372 68.852 26.955 77.55 26.955 77.55l-4.412-4.186-2.633-2.5s8.679-11.614 9.205-13.626c.527-2.029.2-12.72.2-12.72l6.881-6.812 6.918-1.558c.018-.018 2.596 18.916-.073 25.82z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#FAF6EB"
      fillRule="evenodd"
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M.352 27.69c1.197-2.521 5.88-9.41 7.364-9.045 1.5.365 6.773 3.27 5.97 4.513-.448.695-5.023-2.43-5.023-2.302 0 .365 5.683 2.741 4.808 4.532-.322.658-5.309-2.668-5.791-2.814-.483-.147 4.45 3.764 3.771 4.184-.661.402-3.807-1.535-3.807-1.535s-.375 4.368-.75 4.752c-.287.31-6.757-1.846-6.542-2.285z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#F3A13B"
      fillRule="evenodd"
      d="M33.83 46.611c-2.903 0-4.663-1.804-4.772-2-1.27-2.09-1.36-6.09.218-7.894 1.161-1.322 3.175-1.411 7.202-1.59 1.614-.072 4.535-.214 5.115-.018 3.683 1.25-1.669 5.072-1.777 5.465-.58 2.108-2.54 6.055-5.987 6.037z"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#1C2628"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.328"
      d="M33.559 29.095c.397.419 4.118 2.13 6.142 4.095"
    ></path>
    <path
      fill="#F55C4A"
      d="M26.62 17.493c.44 0 .797-.407.797-.91 0-.502-.357-.91-.797-.91-.44 0-.796.408-.796.91 0 .503.357.91.796.91z"
    ></path>
  </svg>
);
