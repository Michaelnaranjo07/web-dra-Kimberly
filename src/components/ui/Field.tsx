import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const fieldClass =
  'w-full rounded-2xl border border-line bg-white px-3.5 py-2.5 text-ink outline-hidden transition-[border-color,box-shadow] duration-150 ease-(--ease-out-strong) focus:border-royal focus:ring-3 focus:ring-royal/14'

type LabelProps = {
  label: string
  hint?: string
  children: React.ReactNode
}

export function Field({ label, hint, children }: LabelProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-muted">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={fieldClass} {...props} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${fieldClass} min-h-28 resize-y`} {...props} />
}
