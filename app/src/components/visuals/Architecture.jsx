export default function Architecture({ className = "" }) {
  const paths = [
    "M40 440V180H260V440H40 M50 430V190H250V430H50 M50 310H170V190 M170 310V430 M170 345H250 M80 190V250H135V190 M50 350H110V410H50 M180 205H236V280H180Z",
    "M110 310v-50a50 50 0 0 1 50 50 M170 380h40a40 40 0 0 0-40-40 M65 335h32 M65 341h32 M65 347h32 M210 365v50 M217 365v50 M224 365v50 M231 365v50",
    "M15 160H285 M25 150v320 M15 180h20 M15 440h20 M40 150v20 M260 150v20 M40 460h220 M40 452v16 M260 452v16",
    "M470 620V250a230 230 0 0 1 460 0V620 M490 620V250a210 210 0 0 1 420 0V620 M460 620h480 M700 0v640 M450 250h500",
    "M1060 450V270l130-75 150 85v170l-130 80-150-80 M1060 270l150 85 130-75 M1210 355v175 M1100 292v130l75 44V335 M1250 332v120l55-34V302 M1060 450l150-80 130 80 M1190 195v175",
    "M1030 470l180 105 160-95 M1040 480v-25 M1360 490v-30 M1025 255l165-95 180 100 M1190 140v30 M1015 245v25 M1370 250v25",
    "M80 600h180 M170 510v180 M110 660a100 100 0 0 1 100-100 M200 590l-45 45 M1050 90h180 M1140 30v140 M1090 90a50 50 0 1 0 100 0a50 50 0 1 0-100 0",
  ];
  return (
    <svg
      className={`architecture ${className}`}
      viewBox="0 0 1400 700"
      fill="none"
      aria-hidden="true"
    >
      <g className="plan-ghost">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className="plan-animated">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength="1"
            style={{ "--delay": `${i * -1.8}s` }}
          />
        ))}
      </g>
      <g
        className="plan-labels"
        fill="currentColor"
        stroke="none"
        fontSize="9"
        fontFamily="monospace"
        letterSpacing="2"
      >
        <text x="75" y="485">
          PLANTA · 01
        </text>
        <text x="1090" y="600">
          PERSPECTIVA · 02
        </text>
        <text x="61" y="145">
          ESPAÇO / ESSÊNCIA
        </text>
      </g>
      <circle className="plan-node" cx="260" cy="180" r="4" />
      <circle className="plan-node" cx="1210" cy="355" r="4" />
    </svg>
  );
}
