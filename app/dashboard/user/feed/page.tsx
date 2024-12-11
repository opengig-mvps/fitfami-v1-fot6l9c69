"use client";
import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from 'lucide-react';

const RecipeFeed: React.FC = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchRecipes = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${session?.user?.id}/feed`, {
        params: { page },
      });
      setRecipes(res?.data?.data?.recipes);
      setTotalPages(res?.data?.data?.totalPages);
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchRecipes(page);
    }
  }, [session, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Recipe Feed</h2>
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        ) : (
          recipes?.map((recipe: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{recipe?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={recipe?.image || "/placeholder.svg"}
                  alt={recipe?.title}
                  className="w-full h-auto aspect-square object-cover"
                />
                <p className="text-sm mt-4">{recipe?.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  View Recipe
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(Math.max(1, page - 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i: number) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default RecipeFeed;