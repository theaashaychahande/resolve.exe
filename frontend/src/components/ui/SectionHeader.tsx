interface SectionHeaderProps {
  tag: string;
  title: string;
  description: string;
  dark?: boolean;
  titleColor?: string;
  descriptionColor?: string;
}

export default function SectionHeader({ tag, title, description, dark = false, titleColor, descriptionColor }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 lg:mb-20">
      <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 ${
        dark
          ? 'text-green-300 bg-white/10 border border-white/10'
          : 'text-green-700 bg-green-50 border border-green-200'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-green-300' : 'bg-green-600'}`} />
        {tag}
      </div>
      <h2
        className={`text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight mb-5 tracking-tight ${
          titleColor || (dark ? 'text-white' : 'text-gray-900')
        }`}
      >
        {title}
      </h2>
      <p className={`max-w-2xl mx-auto text-lg leading-relaxed ${descriptionColor || (dark ? 'text-white/70' : 'text-gray-600')}`}>
        {description}
      </p>
    </div>
  );
}
