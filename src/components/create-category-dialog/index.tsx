import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"

import { useFetchAPI } from "../../hooks/useFetchAPI"
import { theme } from "../../style/theme"
import { createCategorySchema } from "../../validators/schemas"
import { CreateCategoryData } from "../../validators/types"
import { Button } from "../button"
import { ErrorMessage } from "../create-transaction-dialog/styles"
import { Dialog } from "../dialog"
import { Input } from "../input"
import { Title } from "../title"
import { Container } from "./styles"

export function CreateDialogCategory() {
  const [open, setOpen] = useState(false)
  const { createCategory, fetchCategories } = useFetchAPI()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryData>({
    defaultValues: {
      title: "",
      color: theme.colors.primary,
    },
    resolver: zodResolver(createCategorySchema),
  })

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onSubmit = useCallback(
    async (data: CreateCategoryData) => {
      await createCategory(data)
      handleClose()
      await fetchCategories()
    },
    [handleClose, createCategory, fetchCategories],
  )

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova categoria</Button>}
    >
      <Container>
        <Title
          title="Nova Categoria"
          subtitle="Crie uma nova categoria para suas transições"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Nome"
              placeholder="Nome da categoria"
              {...register("title")}
              // error={errors.title?.message}
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
            <Input
              label="Cor"
              type="color"
              {...register("color")}
              // error={errors.color?.message}
            />
            {errors.color && (
              <ErrorMessage>{errors.color.message}</ErrorMessage>
            )}
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  )
}
