import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const MemesGrid = ({ memes }) => {
    if (!memes.length) {
        return <div className="text-white text-center">No memes found</div>;
    }

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {memes.map((meme) => (
        <Link key={meme._id} className="bg-gray-800 rounded-lg overflow-hidden" to={`/reel/${meme._id}`}>
          <div className="aspect-video relative p-2">
            {meme.media.mediaType == "image" ? (
                
              <img src={meme.media.link} alt={meme.title} className="object-cover w-full h-full rounded-lg" />
            ) : (
              <video
                src={meme.media.link}
                alt={meme.title}
                className="object-cover w-full h-full rounded-lg"
                autoPlay
                loop
                muted
              />
            )
            }
          </div>
          <div className="p-4">
            <h3 className="text-white text-lg font-semibold mb-3">
              {meme.title}
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">{meme.likers.length}</span>
              </div>
              <span className="text-gray-400">{formatDate(meme.createdAt)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
