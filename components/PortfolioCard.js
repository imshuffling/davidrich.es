import Link from "next/link";
import Image from "next/image";
import imageBlur from "../utils/imageBlur";

export default function PortfolioCard({ item, loading }) {
  const { title, slug, media, image, agency } = item;

  return (
    <div className="card">
      <Link href={"/portfolio/" + slug}>
        <div className="card__image">
          <Image
            src={image.url}
            width={image.width}
            height={image.height}
            blurDataURL={`data:image/png;base64,${imageBlur}`}
            placeholder="blur"
            loading={loading ? loading : "lazy"}
            style={{ objectFit: "cover", height: "100%" }}
            sizes="(min-width: 1960px) 1407px, 71.89vw"
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
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            <div>View project</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
