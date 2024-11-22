export function SectionLayout({ children, className = "" }) {
    return (
        <section
            className={`max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}
        >
            {children}
        </section>
    );
}
