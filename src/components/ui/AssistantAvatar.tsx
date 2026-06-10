export const AssistantAvatar = ({ size = 24 }: { size?: number }) => (
  <div 
    className="rounded-full overflow-hidden flex items-center justify-center bg-background border border-[rgba(0,229,255,0.3)] shadow-[0_0_10px_rgba(0,229,255,0.2)]"
    style={{ width: size, height: size }}
  >
    <img 
      src="/ai-avatar.png" 
      alt="ZenLoft AI Assistant" 
      className="w-full h-full object-cover"
      onError={(e) => {
        // Fallback to a simple gradient if the image isn't found
        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%230A0F15"/><circle cx="50" cy="50" r="20" fill="%2300E5FF" opacity="0.8"/></svg>';
      }}
    />
  </div>
);
