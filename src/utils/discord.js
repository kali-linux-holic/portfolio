// Discord Live Profile & Avatar Decoration Fetcher
// Uses JAPI, DiscordLookup & Lanyard public APIs with automatic 10-minute polling

export async function fetchDiscordProfile(userId) {
  if (!userId || userId === 'YOUR_DISCORD_USER_ID') {
    return null;
  }

  // Helper fetch with timeout
  const fetchWithTimeout = async (url, ms = 4000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      return response;
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  // 1. Try JAPI.rest (Fastest and reliable unauthenticated Discord user endpoint)
  try {
    const res = await fetchWithTimeout(`https://japi.rest/discord/v1/user/${userId}`, 4000);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.id) {
        const d = json.data;
        const decorAsset = d.avatar_decoration_data?.asset;
        const decorationUrl = decorAsset
          ? `https://cdn.discordapp.com/avatar-decoration-presets/${decorAsset}.png?size=256`
          : null;

        return {
          id: d.id,
          username: d.username,
          displayName: d.global_name || d.username || 'Vecna',
          avatarUrl: d.avatarURL || (d.avatar ? `https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}.png?size=256` : null),
          decorationUrl,
          bannerUrl: d.bannerURL || null,
          accentColor: d.accent_color,
          badges: d.public_flags_array || [],
          status: 'online',
        };
      }
    }
  } catch (err) {
    console.warn('JAPI fetch failed, trying fallbacks...', err);
  }

  // 2. Try DiscordLookup API
  try {
    const res = await fetchWithTimeout(`https://api.discordlookup.mesalytic.moe/v1/user/${userId}`, 4000);
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        const isGif = data.avatar?.is_animated;
        const avatarUrl = data.avatar?.link
          ? data.avatar.link
          : data.avatar?.id
          ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar.id}.${isGif ? 'gif' : 'png'}?size=256`
          : null;

        const decorationAsset = data.avatar_decoration?.asset;
        const decorationUrl = decorationAsset
          ? `https://cdn.discordapp.com/avatar-decoration-presets/${decorationAsset}.png?size=256`
          : null;

        return {
          id: data.id,
          username: data.username,
          displayName: data.global_name || data.username || 'Vecna',
          avatarUrl,
          decorationUrl,
          bannerUrl: data.banner?.link || null,
          accentColor: data.accent_color,
          badges: data.badges || [],
          status: 'online',
        };
      }
    }
  } catch (err) {
    console.warn('DiscordLookup fetch failed, trying Lanyard fallback...', err);
  }

  // 3. Try Lanyard API fallback
  try {
    const res = await fetchWithTimeout(`https://api.lanyard.rest/v1/users/${userId}`, 4000);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        const u = d.discord_user;
        const isGif = u.avatar && u.avatar.startsWith('a_');
        const avatarUrl = u.avatar
          ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${isGif ? 'gif' : 'png'}?size=256`
          : null;

        const decorAsset = u.avatar_decoration_data?.asset;
        const decorationUrl = decorAsset
          ? `https://cdn.discordapp.com/avatar-decoration-presets/${decorAsset}.png?size=256`
          : null;

        return {
          id: u.id,
          username: u.username,
          displayName: u.global_name || u.username || 'Vecna',
          avatarUrl,
          decorationUrl,
          status: d.discord_status || 'online',
        };
      }
    }
  } catch (err) {
    console.warn('Lanyard fetch failed', err);
  }

  return null;
}

