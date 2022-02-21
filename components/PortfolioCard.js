import Link from "next/link";
import Image from "next/image";

export default function RecipeCard({ item }) {
  const { title, slug, media, image, agency } = item;

  return (
    <div className="card">
      <Link href={"/portfolio/" + slug}>
        <a>
          <div className="card__image">
            <Image
              src={image.url}
              objectFit="cover"
              blurDataURL
              placeholder="blur"
              layout="fill"
              alt={title}
              quality={50}
            />
            {media && (
              <video loop muted autoPlay playsInline>
                <source src={media.url} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="card__details">
            <div className="card__content">
              <span>{agency ? agency : "Mirum"}</span>
              <h2>{title}</h2>
              <div>View project</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
