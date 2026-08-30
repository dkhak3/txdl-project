import { useNavigate } from "react-router-dom";

function VideoGuideCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/guide");
  };

  return (
    <section className="mt-8">
      <button
        type="button"
        onClick={handleClick}
        className="
          group
          w-full
          overflow-hidden
          rounded-3xl
          border
          border-gray-200
          bg-white
          text-left
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-orange-300
          hover:shadow-lg
        "
      >
        <div
          className="
            relative
            flex
            min-h-[180px]
            items-center
            justify-between
            overflow-hidden
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            px-8
            py-8
            text-white
          "
        >
          {/* Background decoration */}
          <div
            className="
              absolute
              -right-16
              -top-16
              h-48
              w-48
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-20
              right-32
              h-40
              w-40
              rounded-full
              bg-white/10
            "
          />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-5">
            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white/20
                text-3xl
                backdrop-blur-sm
              "
            >
              ▶
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Hướng dẫn sử dụng bằng Video
              </h2>

              <p className="mt-2 max-w-xl text-sm text-orange-100">
                Xem video hướng dẫn toàn bộ quy trình sử dụng hệ thống TXDL.
              </p>
            </div>
          </div>

          {/* Button */}
          <div
            className="
              relative
              z-10
              hidden
              items-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              font-semibold
              text-orange-600
              shadow-sm
              transition
              group-hover:bg-orange-50
              md:flex
            "
          >
            Xem hướng dẫn
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </button>
    </section>
  );
}

export default VideoGuideCard;
