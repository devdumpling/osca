let NextAuth;
let auth0;

export default async (req, res) => {
  if (!NextAuth || !auth0) {
    import("next-auth")
      .then((n) => {
        NextAuth = n.default;

        import("next-auth/providers/auth0")
          .then((p) => {
            const { default: auth0Provider } = p;

            auth0 = auth0Provider({
              clientId: process.env.AUTH0_CLIENT_ID,
              clientSecret: process.env.AUTH0_CLIENT_SECRET,
              issuer: process.env.AUTH0_DOMAIN,
            });

            NextAuth(req, res, {
              providers: [auth0],
              secret: process.env.NEXTAUTH_SECRET,
              jwt: {
                secret: process.env.NEXTAUTH_SECRET,
              },
              debug: true,
            });
          })
          .catch((err) => console.error("error Providers", err));
      })
      .catch((err) => console.error("error NextAuth", err));
  } else {
    return NextAuth(req, res, {
      providers: [auth0],
      secret: process.env.NEXTAUTH_SECRET,
      jwt: {
        secret: process.env.NEXTAUTH_SECRET,
      },
      debug: true,
    });
  }
};
