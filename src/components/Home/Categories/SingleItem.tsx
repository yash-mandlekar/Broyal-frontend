import Image from "next/image";
import Link from "next/link";

const SingleItem = ({ item }) => {
  return (
    <Link 
      href={`/category/${item.id}`}
      className="group block"
    >
      <div className="rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-all duration-300">
        {/* Image Container with fixed aspect ratio */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            quality={90}
            priority={false}
          />
        </div>
        
        {/* Title */}
        <div className="p-4 text-center">
          <h3 className="font-medium text-sm md:text-base text-dark group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default SingleItem;