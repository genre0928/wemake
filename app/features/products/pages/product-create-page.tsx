import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/product-create-page";
import { Form, redirect } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { getCategories } from "../queries";
import { createProduct } from "../mutations";
import { LoaderCircleIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "제품 등록 | Wemake" },
    { name: "description", content: "제품 등록 페이지" },
  ];
};

const formSchema = z.object({
  name: z.string().min(1),
  tags: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  category: z.string(),
  image: z.instanceof(File).refine(
    (file) => {
      return file.size <= uploadImageSize && file.type.startsWith("image/");
    },
    {
      message: "이미지 파일의 크기 또는 형식이 올바르지 않습니다.",
    },
  ),
});

const uploadImageSize = 2 * 1024 * 1024;

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const categories = await getCategories(client);
  return { categories };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { data, success, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { image, ...rest } = data;
  const { data: uploadData, error: uploadError } = await client.storage
    .from("icons")
    .upload(`${userId}/${Date.now()}`, image, {
      contentType: image.type,
      upsert: false,
    });
  if (uploadError) {
    return { formErrors: { image: [uploadError.message] } };
  }
  const {
    data: { publicUrl },
  } = await client.storage.from("icons").getPublicUrl(uploadData.path);
  const productId = await createProduct(client, {
    name: rest.name,
    tags: rest.tags.split(","),
    url: rest.url,
    description: rest.description,
    category_id: parseInt(rest.category),
    imageUrl: publicUrl,
    userId,
  });
  return redirect(`/products/${productId}`);
};

export default function ProductCreatePage({
  loaderData,
}: Route.ComponentProps) {
  const [image, setImage] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div>
      <Hero title="제품 등록" description="제품 등록 페이지" />
      <Form
        className="flex flex-col max-w-5xl mx-auto gap-20"
        method="post"
        encType="multipart/form-data"
      >
        <div className="flex gap-15">
          <div className="flex flex-col gap-7 flex-1">
            <InputPair
              label="제품 이름"
              description="제품의 이름을 작성해주세요"
              name="name"
              id="name"
              placeholder="제품 이름"
            />
            <InputPair
              label="제품 태그"
              description="제품의 태그는 쉼표로 구분해주세요"
              name="tags"
              id="tags"
              placeholder="태그1, 태그2, 태그3, ..."
            />
            <InputPair
              label="제품 URL"
              description="제품의 URL을 작성해주세요"
              name="url"
              id="url"
              placeholder="https://example.com"
            />
            <InputPair
              label="제품 설명"
              description="제품의 설명을 작성해주세요"
              name="description"
              id="description"
              placeholder="제품 설명"
              textArea
            />
            <SelectPair
              label="제품 카테고리"
              description="해당하는 제품의 카테고리를 선택해주세요"
              name="category"
              required
              placeholder="Select a category"
              options={loaderData.categories.map((category) => ({
                label: category.name,
                value: category.category_id.toString(),
              }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="image" className="flex flex-col gap-1 items-start">
              <div>제품 이미지</div>
              <small className="text-muted-foreground">
                제품의 이미지를 업로드해주세요
              </small>
            </Label>
            <Input type="file" id="image" name="image" onChange={onChange} />
            <div className="flex flex-col gap-0.5 text-muted-foreground text-xs mb-5">
              <span>제품 사이즈 : 100px x 100px</span>
              <span>{`제품 파일 크기 : ${uploadImageSize / 1024 / 1024}MB 이하`}</span>
              <span>제품 파일 형식 : PNG, JPG, JPEG</span>
            </div>
            <div className="size-64 rounded-xl shadow-xl border-2 flex items-center justify-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="제품 이미지"
                  className="size-full object-cover"
                />
              ) : (
                "이미지를 등록해주세요"
              )}
            </div>
          </div>
        </div>
        <Button
          variant="default"
          type="submit"
          className="min-h-12 text-lg font-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "제품 제출"
          )}
          제품 제출
        </Button>
      </Form>
    </div>
  );
}
