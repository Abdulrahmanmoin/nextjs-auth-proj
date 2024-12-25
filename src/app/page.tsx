import Link from "next/link";
import { cookies } from "next/headers";

export default function Home() {

  const token = cookies().get("token")?.value


  return (
    <div className='flex justify-center items-center flex-col h-screen gap-y-3 bg-black text-white px-5 sm:px-0'>



      {token &&
        <>
          <Link
            href="/profile"
            className='text-white font-semibold  p-2 rounded-md underline'
          >Visit your profile</Link>
        </>
      }

      {!token &&
        <>
          <Link
            href="/signup"
            className='text-white font-semibold  p-2 rounded-md underline'
          >Visit Signup page</Link>

          <Link
            href="/login"
            className='text-white font-semibold  p-2 rounded-md underline'
          >Visit login page</Link>
        </>
      }
    </div>
  );
}
