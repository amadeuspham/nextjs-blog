import cn from 'classnames'

export default function PreviewAlert() {
  return (
    <div
      className={cn('border-b',
        'bg-accent-7 border-accent-7',
        'mb-4'
      )}
    >
      <div className="py-2 text-center text-sm">
        This is page is a preview.{' '}
        <a
          href="/api/exit-preview"
          className="underline hover:text-cyan duration-200 transition-colors"
        >
          Click here
        </a>{' '}
        to exit preview mode.
      </div>
    </div>
  )
}
