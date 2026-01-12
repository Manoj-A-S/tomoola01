import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Play } from "lucide-react";

type VideoGalleryProps = {
    videos: string[];
};

export default function VideoGallery({ videos }: VideoGalleryProps) {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [visibleSlides, setVisibleSlides] = useState(4);


    return (
        <>
            <div className="mt-6 relative">
                {videos.length > visibleSlides && (
                    <>
                        <button className="custom-prev nav-btn left-[-25px]">‹</button>
                        <button className="custom-next nav-btn right-[-25px]">›</button>
                    </>
                )}

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={
                        videos.length > visibleSlides
                            ? { prevEl: ".custom-prev", nextEl: ".custom-next" }
                            : false
                    }
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: { slidesPerView: 1.2 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                    onInit={(swiper) => {
                        setVisibleSlides(Number(swiper.params.slidesPerView));
                    }}
                    onResize={(swiper) => {
                        setVisibleSlides(Number(swiper.params.slidesPerView));
                    }}
                    className="pb-10"
                >
                    {videos.map((video, index) => (

                        <SwiperSlide key={index}>
                            <div
                                onClick={() => setActiveVideo(video)}
                                className="relative cursor-pointer rounded-2xl overflow-hidden shadow-md group"
                            >
                                {/* Thumbnail */}
                                <img
                                    src={
                                        video.includes("youtube")
                                            ? `https://img.youtube.com/vi/${video.split("v=")[1]}/hqdefault.jpg`
                                            : "/video-placeholder.jpg"
                                    }
                                    className="w-full h-[220px] object-cover"
                                />

                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/40" />

                                {/* Play icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                                        <Play className="w-8 h-8 text-red-600 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>

            {/* VIDEO MODAL */}
            {activeVideo && (
                <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
            )}
        </>
    );
}

type VideoModalProps = {
    video: string;
    onClose: () => void;
};

function VideoModal({ video, onClose }: VideoModalProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="relative w-[90%] md:w-[800px] aspect-video bg-white rounded-2xl overflow-visible">

                {/* CLOSE BUTTON OUTSIDE */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 z-50 mb-5
             w-12 h-12 rounded-full 
             bg-black/100 text-white text-3xl
             flex items-center justify-center
             hover:scale-110 transition">✕</button>

                {video.includes("youtube") ? (
                    <iframe
                        src={`${video.replace("watch?v=", "embed/")}?autoplay=1`}
                        className="w-full h-full rounded-2xl"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                    />
                ) : (
                    <video
                        src={video}
                        controls
                        autoPlay
                        className="w-full h-full rounded-2xl"
                    />
                )}
            </div>
        </div>
    );
}
