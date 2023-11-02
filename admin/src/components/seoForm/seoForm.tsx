import { SubmitHandler, useForm } from "react-hook-form";
import { ISeo } from "../../types/seo";
import { useUpdateSeoMutation } from "../../services/adminApi";
import { toast } from "react-toastify";

type Props = {
    seo: ISeo;
    setEditOpen: () => void;
}

export const SeoForm = ({ seo, setEditOpen }: Props) => {
    const { register, handleSubmit } = useForm<ISeo>({
        defaultValues: {
            title: seo.title,
            name: seo.name,
            keyword: seo.keyword,
            description: seo.description
        }
    });
    
    const [updateSeo] = useUpdateSeoMutation();


    const submitForm: SubmitHandler<ISeo> = (data) => {
        updateSeo({ id: seo.id, data: {
            title: data.title,
            name: data.name,
            keyword: data.keyword,
            description: data.description
        }})
        .unwrap()
        .then(() => {
          setEditOpen()
          toast.success('Seo успешно отредактировано', {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        })
        .catch(() => {
          toast.error('Что-то пошло не так....', {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        })
      }

    return (
        <form className="flex flex-col items-center gap-5 mt-10" onSubmit={handleSubmit(data => submitForm(data))}>
            <div className="flex flex-col gap-2">
                <label className="text-center">seo - title</label>
                <input className="w-[300px] bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" {...register('title', { required: true })} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-center">seo - name</label>
                <input className="w-[300px] bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" {...register('name', { required: true })} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-center">seo - keyword</label>
                <input className="w-[300px] bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" {...register('keyword', { required: true })} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-center">seo - description</label>
                <input className="w-[300px] bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" {...register('description', { required: true })} />
            </div>
            <div className="flex justify-center">
                <button className="rounded-xl text-white bg-green-600 px-5 py-2" type="submit">Сохранить</button>
            </div>
        </form>
    );
};