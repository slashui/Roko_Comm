import NextAuth from "next-auth";
import prisma from "../../../../libs/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from 'bcrypt'
 
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            // Remove hardcoded callback URL
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: "FREE"
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // Remove hardcoded callback URL
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: "FREE"
                }
            }
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    // 基本验证
                    if(!credentials?.email || !credentials?.password) {
                        throw new Error('Please enter an email and password');
                    }

                    // 直接使用 Prisma 客户端查询，避免适配器问题
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });

                    if (!user || !user?.hashedPassword) {
                        throw new Error('No user found');
                    }

                    const passwordMatch = await bcrypt.compare(
                        credentials.password, 
                        user.hashedPassword
                    );

                    if (!passwordMatch) {
                        throw new Error('Incorrect password');
                    }

                    // 返回不包含敏感信息的用户对象
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role || "FREE"
                    };
                } catch (error) {
                    console.error('Authorization error:', error);
                    throw error; // 让 NextAuth 处理错误
                }
            },
        }),  
    ],
    pages: {
        signIn: '/login',
        error: '/login' // 修改为实际存在的路径
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role || "FREE";
            } else if (token.id) {
                // 每次都从数据库获取最新的用户角色
                try {
                    const dbUser = await prisma.user.findUnique({
                        where: { id: token.id },
                        select: { role: true }
                    });
                    if (dbUser) {
                        token.role = dbUser.role || "FREE";
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role || "FREE";
            }
            return session;
        }
    },
    secret: process.env.SECRET || "fallback-secret-do-not-use-in-production",
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: true, // 启用调试以获取更多错误信息
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }