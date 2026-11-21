import { listMedia } from '@/lib/media';
import { requireSession } from '@/lib/auth';
import { deleteMediaAction } from '@/app/cms/actions/media';
import { DeleteButton } from '@/components/cms/DeleteButton';

export default async function MediaPage() {
  const { user } = await requireSession();
  const media = await listMedia();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Media Library</h1>
          <p className="text-zinc-400 text-sm">Upload and manage images and assets used across the portfolio.</p>
        </div>
        <form
          action="/api/media"
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <input
            name="file"
            type="file"
            accept="image/*,application/pdf"
            required
            className="text-xs text-zinc-400 file:mr-2.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold transition-colors shrink-0"
          >
            Upload Media
          </button>
        </form>
      </div>

      {media.length === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-16 text-center">
          <p className="text-zinc-500 text-sm">No media uploaded yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
            {media.map((item) => (
              <div key={item.id} className="relative rounded-lg overflow-hidden border border-zinc-900/50 bg-[#09090b] group">
                <img
                  src={item.url}
                  alt={item.altText || item.originalName}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                  <p className="text-xs text-center text-zinc-200 mb-1 truncate" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <DeleteButton
                    action={deleteMediaAction}
                    id={item.id}
                    itemTitle={item.originalName}
                    variant="button"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[10px] text-zinc-400 truncate" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="text-[10px] text-zinc-500">{item.size ? (item.size / 1024).toFixed(1) + ' KB' : '—'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
