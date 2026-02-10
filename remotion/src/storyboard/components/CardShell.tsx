import {colors, fonts, tokens} from '../../theme';

export const CardShell: React.FC<{
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children?: React.ReactNode;
}> = ({eyebrow, title, subtitle, rightSlot, children}) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: tokens.layout.maxContentWidth,
        padding: '40px 44px',
        borderRadius: 28,
        backgroundColor: colors.panelSoft,
        border: 'none',
        boxShadow: tokens.shadow.card,
        display: rightSlot ? 'grid' : 'block',
        gridTemplateColumns: rightSlot ? '1.1fr 0.9fr' : undefined,
        gap: rightSlot ? 28 : undefined,
        alignItems: 'start',
      }}
    >
      <div>
        {/* Reserve consistent header space so titles don't jump between card types. */}
        <div
          style={{
            fontFamily: fonts.brand,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: colors.muted,
            marginBottom: 14,
            whiteSpace: 'pre',
            visibility: eyebrow ? 'visible' : 'hidden',
          }}
        >
          {eyebrow ?? ' '}
        </div>

        {title ? (
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: '-0.01em',
              color: colors.text,
              marginBottom: 12,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
        ) : null}

        {subtitle ? (
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 24,
              lineHeight: 1.3,
              color: colors.muted,
              marginBottom: 18,
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        ) : null}

        {children}
      </div>

      {rightSlot ? <div>{rightSlot}</div> : null}
    </div>
  );
};
