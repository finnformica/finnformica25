export const CrosshairIcon = ({
  width = "15",
  height = "15",
}: {
  width?: string;
  height?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top Vertical Line */}
    <path
      d="M7.5 2C7.77614 2 8 2.22386 8 2.5V5.5C8 5.77614 7.77614 6 7.5 6C7.22386 6 7 5.77614 7 5.5V2.5C7 2.22386 7.22386 2 7.5 2Z"
      fill="currentColor"
    />

    {/* Left Horizontal Line */}
    <path
      d="M2 7.5C2 7.22386 2.22386 7 2.5 7H5.5C5.77614 7 6 7.22386 6 7.5C6 7.77614 5.77614 8 5.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z"
      fill="currentColor"
    />

    {/* Bottom Vertical Line */}
    <path
      d="M7.5 9C7.77614 9 8 9.22386 8 9.5V12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5V9.5C7 9.22386 7.22386 9 7.5 9Z"
      fill="currentColor"
    />

    {/* Right Horizontal Line */}
    <path
      d="M9 7.5C9 7.22386 9.22386 7 9.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H9.5C9.22386 8 9 7.77614 9 7.5Z"
      fill="currentColor"
    />
  </svg>
);

export const CrosshairIcons = () => (
  <div className="flex h-40 items-center justify-between">
    <CrosshairIcon />
    <CrosshairIcon />
  </div>
);
