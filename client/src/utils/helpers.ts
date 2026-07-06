export const AVATAR_COLORS = ['#c43c3c', '#2d8a4e', '#2d6ab0', '#7b4eb0', '#f5cd47', '#f87168', '#4bce97'];

export const getAvatarColor = (name: string) => {
  if (!name) return '#596773';
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

export const getInitials = (name: string) => {
  if (!name) return '';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
};
