import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MdImageNotSupported } from "react-icons/md";
import { PostDetails } from "../../core/entities/post";
import trimText from "../../lib/utils/trimText";

interface Props {
  post: PostDetails;
  busy?: boolean;
  onDeleteClick?: () => void;
}

const PostCard: FC<Props> = ({ post, busy, onDeleteClick }): JSX.Element => {
  const { thumbnail, createdAt, tags, title, meta, slug } = post;

  return (
    <div className="flex flex-col justify-between rounded-lg bg-neutral text-onNeutral shadow-lg hover:shadow-xl overflow-hidden">
      <Link href={"/admin/posts/" + slug}>
        <div className="aspect-video relative">
          {thumbnail ? (
            <Image
              src={thumbnail}
              fill={true}
              alt="thumbnail"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-full bg-primary text-onPrimaryBg opacity-50">
              <div className="flex flex-col items-center justify-center h-full animate-pulse">
                <MdImageNotSupported size={80} />
                <span className="text-xl font-bold">No Image</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold leading-tight">
            {trimText(title, 50)}
          </h3>
          <div className="text-sm flex w-full justify-between my-2">
            <span className="flex-1">
              {new Date(createdAt).toLocaleDateString("sr-Latn", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <div className="space-x-2 flex-2 flex flex-wrap items-center justify-end gap-y-2 ">
              {tags.map((tag) => (
                <span
                  className="rounded bg-primaryBg px-1 text-onPrimaryBg font-semibold "
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className=" text-gray-700 text-base">{trimText(meta, 75)}</p>
        </div>
      </Link>
      <div className="flex justify-end items-center space-x-2 mb-4 mr-4">
        {busy ? (
          <span className="animate-pulse">Removing...</span>
        ) : (
          <>
            <Link
              href={"/admin/posts/update/" + slug}
              className="bg-emerald-500 text-white px-2 rounded cursor-pointer hover:scale-[0.98]"
            >
              Edit
            </Link>
            <button
              onClick={onDeleteClick}
              className="bg-rose-500 text-white px-2 rounded hover:scale-[0.98]"
            >
              Delete
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
};
export default PostCard;
