import React from "react";
import LogoMandeh from "../image/LogoRumahCinta.png";

function Footer() {
  return (
    <div className="footer">
      <div className="bottom-0 flex h-[250px]  w-full items-center justify-center gap-3 bg-bgSec md:gap-10">
        <div className="w-[100px]  md:w-[150px]">
          <img src={LogoMandeh} alt="LogoMandeh" />
        </div>
        <div className="text-textSec">
          <div className="my-[10px]">
            <p className="text-[14px] font-bold md:text-[18px]">Customer Service</p>
            <p className="text-[10px] md:text-[12px]">
              +0817-980-3739
              <br /> +0857-1847-0247 (Whatsapp)
            </p>
          </div>
          <div className="my-[10px]">
            <p className="text-[14px] font-bold md:text-[18px]">Ikuti Kami</p>
            <p className="text-[10px] md:text-[12px]">@lenteramandeh (Instagram)</p>
          </div>
          <div className="my-[10px]">
            <p className="text-[14px] font-bold md:text-[18px]">Email</p>
            <p className="text-[10px] md:text-[12px]">psikologilenteramandeh@gmail.com</p>
          </div>
        </div>

        <div className="w-[180px] text-textSec md:w-[300px]">
          <div className="my-[10px]">
            <p className="text-[14px] font-bold md:text-[18px]">Alamat</p>
            <p className="text-[10px] md:text-[12px]">
              Jalan Raya Pemda-Karadenan No. 25, RT 001/004, Kel. Karadenan, Kec. Cibinong, Kab. Bogor 16913
            </p>
          </div>
          <div className="my-[10px]">
            <p className="text-[14px] font-bold md:text-[18px]">MeWell</p>
            <p className="text-[10px] md:text-[12px]">Copyright © 2023 Mental Wellness</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
