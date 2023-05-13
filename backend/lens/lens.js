import { LensClient, development, production } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: production,
});

const address = "0x864d69e84BCBf88dc63c0333501B1db5D3fDBf28";

export async function getProfileData(address) {
  const allOwnedProfiles = await lensClient.profile.fetchAll({
    ownedBy: [address],
    limit: 1,
  });
  try {
    const defaultProfile = allOwnedProfiles.items[0];
    return {
      name: defaultProfile.name,
      address: profile.ownedBy,
      bio: defaultProfile.bio,
      handle: defaultProfile.handle,
      pictureUrl: defaultProfile.picture.original.url,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getProfileByHandle(handle) {
  try {
    const profile = await lensClient.profile.fetch({
      handle: handle,
    });
    return {
      name: profile.name,
      address: profile.ownedBy,
      bio: profile.bio,
      handle: profile.handle,
      pictureUrl: profile.picture.original.url,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}
