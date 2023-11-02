import { success } from './_utils/result';

export default {
  'GET /api/sso/auth/user': (req, res) => {
    return res.json(
      success({
        id: 'clla14mps0000mh08rvx8cf1f',
        name: '夏不来',
        email: 'hocgin@gmail.com',
        picture:
          'https://lh3.googleusercontent.com/a/AAcHTtcyrwWgwmYB2voF8sDK6i5U6X8w3_Zs8GV-zZdEJgDzmfg=s96-c',
        sessionToken:
          'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..-Bpu3TIOXLDKcuJd.G-LOpFCcY3E1tcC95W7PbGGqgu1VKjTRctYXxsqz9z6WZ7Rgn8LxWcyVv8WCRJhtI0LdiMKD-J5ryYnurwDYxuuqbInWoZ_66VO7hZSR2KHBkyvfBDmjAoN0nlJhgcSZM36fqFFewxChXNGv9GfGNZ1NnD4VzyT_89cWeeaCq115uWkkJDOimgKbjvZ6joWc9irp9UNT4UMO2AbyRVJXDlcqWPN_AcUJ6OZ0ZPj0juKq-AMGYBkGAkhi1_xNVJhT0_JThfZEXdUOw0Z5R2PywcOuXhwDG46NzM_M10u0BaTcHKIIbk0KBxWuNLfc0H21HipjT_ZKsS-NKNC7JLxAZ3WxOBtSfzO_DCHiWXyNZykaaf3a9fmQy6-l-KjUF75-_X_-FaoDDSkc5bM.KJfpzO8RTGwp8DCvgpCCQg',
        isPro: true,
        upgradeUrl: 'https://license.hocgin.com/projects/dove-feed',
        licenseAt: '2023-10-13T22:43:28.000Z',
      }),
    );
  },
};
