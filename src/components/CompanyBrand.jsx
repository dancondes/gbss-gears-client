import React from 'react'
import PropTypes from 'prop-types'
import { gbss_logo_white } from '@/assets/images'

/**
 * CompanyBrand
 *
 * variant="panel"   — full-height branding panel (desktop split-screen layout)
 * variant="compact" — full-bleed color banner for embedding at the top of a card, header, etc.
 *
 * Both variants use the primary/secondary theme colors as an actual bold
 * background (not a faint tint) so the brand identity reads immediately.
 */
const CompanyBrand = ({ title, description, extra, variant }) => {
    const isCompact = variant === 'compact'

    return (
        <div
            className={
                isCompact
                    ? 'relative flex w-full flex-col items-center overflow-hidden bg-linear-to-br from-primary to-secondary px-6 py-8 text-center'
                    : 'relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-primary to-secondary px-10 py-12 text-center lg:px-16'
            }
        >
            {/* Soft decorative shapes — texture only, restrained so the gradient itself carries the brand */}
            <div className={isCompact ? 'pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl' : 'pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl'} />
            <div className={isCompact ? 'pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/10 blur-2xl' : 'pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl'} />

            <div className={isCompact ? 'relative' : 'relative z-10 max-w-sm'}>
                {/* Logo — width-based frame sized for a landscape (~3:1) mark; object-contain guards the ratio */}
                <div
                    className={
                        isCompact
                            ? 'mx-auto mb-3 inline-flex items-center justify-center rounded-xl'
                            : 'mx-auto mb-6 inline-flex items-center justify-center rounded-2xl'
                    }
                >
                    <img
                        src={gbss_logo_white}
                        alt="GBSS Logo"
                        className={isCompact ? 'h-auto w-28 object-contain' : 'object-contain md:h-24 lg:h-30 w-auto'}
                    />
                </div>

                {/* Company name — bold and dominant against the color background */}
                <h1
                    className={
                        isCompact
                            ? 'text-2xl font-bold tracking-tight text-white'
                            : 'text-3xl font-bold tracking-tight text-white lg:text-4xl'
                    }
                >
                    {title}
                </h1>

                {/* Optional tagline / subtitle */}
                {description && (
                    <p
                        className={
                            isCompact
                                ? 'mt-1.5 text-xs font-medium text-white/80'
                                : 'mt-4 text-sm leading-relaxed text-white/80 lg:text-base'
                        }
                    >
                        {description}
                    </p>
                )}

                {/* Anything richer than plain text — acronym breakdown, list, etc.
                    Wrapped in a solid light surface so it stays legible regardless of
                    its own internal text color, since it now sits on a colored background. */}
                {extra && (
                    <div className={isCompact ? 'mt-4 rounded-xl p-4 shadow-sm' : 'mt-4 rounded-2xl'}>
                        {extra}
                    </div>
                )}
            </div>
        </div>
    )
}

CompanyBrand.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    extra: PropTypes.node,
    variant: PropTypes.oneOf(['panel', 'compact']),
}

CompanyBrand.defaultProps = {
    description: null,
    extra: null,
    variant: 'panel',
}

export default CompanyBrand