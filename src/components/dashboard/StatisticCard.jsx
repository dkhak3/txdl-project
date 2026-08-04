// src/components/dashboard/StatisticCard.jsx

function StatisticCard({
  title,

  value,

  color,
}) {
  return (
    <div
      className="
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-8
            text-center
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            "
    >
      <h2
        className={`
                text-5xl
                font-extrabold
                mb-4
                ${color}
                `}
      >
        {value}
      </h2>

      <p
        className="
                text-sm
                font-bold
                tracking-widest
                text-gray-600
                "
      >
        {title}
      </p>
    </div>
  );
}

export default StatisticCard;
