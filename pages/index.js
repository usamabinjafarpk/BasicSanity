
// pages/index.js

import Link from "next/link";


export default function Home() {
 

  return (
    <div>
      <Link href='/adm'>
     <button>ADM</button>
     </Link>
     <Link href='/assessor'>
     <button>Assessor</button>
     </Link>
    </div>
  );
}
