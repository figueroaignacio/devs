import { Link } from "@/config/i18n/routing";
import { getInitials } from "@/modules/app/lib/utils";
import { getUser } from "@/modules/app/services/users-service";
import { auth } from "@/modules/auth/lib/auth";
import { ChallengesTab } from "@/modules/profile/ui/challenges-tab";
import { CommentsTab } from "@/modules/profile/ui/comments-tab";
import { PostsTab } from "@/modules/profile/ui/posts-tab";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User Profile",
  description: "View user profile",
};

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  const user = await getUser(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 space-y-6 max-w-3xl">
      <header className="w-full border-b flex items-center gap-x-4 pb-3">
        <Button className="" variant="ghost" size="icon">
          <Link href="/hub" className="flex items-center">
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
        {user.name}
      </header>
      <div className="space-y-6">
        <div className="flex items-center gap-x-4">
          <Avatar className="size-24">
            <AvatarImage
              src={session?.user?.image ?? undefined}
              alt={session?.user?.name ?? "User avatar"}
            />
            <AvatarFallback>
              {getInitials(session?.user?.name ?? "User")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <h2 className="text-sm text-muted-foreground">{user.email}</h2>
            <span className="text-sm">Fullstack Developer</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          obcaecati sequi reiciendis ad excepturi sunt repellat facilis omnis
          soluta saepe.
        </p>
      </div>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostsTab userId={user.id} />
        </TabsContent>
        <TabsContent value="challenges">
          <ChallengesTab userId={user.id} />
        </TabsContent>
        <TabsContent value="comments">
          <CommentsTab userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
