"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Heart, MessageCircle, LoaderCircleIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RecipeInteractionPage = () => {
  const { data: session } = useSession();
  const { recipeId } = useParams<{ recipeId: string }>();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/recipes/${recipeId}`);
        setRecipe(res?.data?.data);
        setLikes(res?.data?.data?.likes);
        setComments(res?.data?.data?.comments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/recipes/${recipeId}/like`, { userId: session?.user?.id });
      if (res?.data?.success) {
        setLikes((prev) => prev + 1);
        toast.success("Liked the recipe!");
      }
    } catch (error) {
      toast.error("Failed to like the recipe.");
      console.error(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const res = await axios.post(`/api/recipes/${recipeId}/unlike`, { userId: session?.user?.id });
      if (res?.data?.success) {
        setLikes((prev) => prev - 1);
        toast.success("Unliked the recipe!");
      }
    } catch (error) {
      toast.error("Failed to unlike the recipe.");
      console.error(error);
    }
  };

  const handleComment = async () => {
    try {
      const res = await axios.post(`/api/recipes/${recipeId}/comment`, {
        userId: session?.user?.id,
        comment: commentText,
      });
      if (res?.data?.success) {
        setComments((prev) => [...prev, commentText]);
        setCommentText("");
        toast.success("Comment added!");
      }
    } catch (error) {
      toast.error("Failed to add comment.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoaderCircleIcon className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <section className="container px-4 md:px-6 py-6">
            {recipe && (
              <Card>
                <CardHeader className="flex flex-col items-start">
                  <CardTitle>{recipe?.title}</CardTitle>
                  <p className="text-muted-foreground">{recipe?.description}</p>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={recipe?.image || "/placeholder.svg"}
                    alt={recipe?.title}
                    className="w-full h-auto aspect-square object-cover"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <Button variant="ghost" size="icon" onClick={handleLike}>
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <span>{likes} Likes</span>
                    <Button variant="ghost" size="icon" onClick={handleUnlike}>
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Unlike</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-5 w-5" />
                      <span className="sr-only">Comment</span>
                    </Button>
                    <span>{comments?.length} Comments</span>
                  </div>
                  <div className="w-full">
                    <Input
                      value={commentText}
                      onChange={(e: any) => setCommentText(e?.target?.value)}
                      placeholder="Add a comment"
                    />
                    <Button onClick={handleComment} className="mt-2">
                      Comment
                    </Button>
                  </div>
                  <div className="w-full space-y-2">
                    {comments?.map((comment, index) => (
                      <div key={index} className="border p-2 rounded-md">
                        {comment}
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default RecipeInteractionPage;