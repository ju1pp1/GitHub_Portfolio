using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EsimLuokat
{
    class Kokonaisuus
    {
        Osa osa;
        Osa varaosa;
        //tee tälle LisääVaraosa
        //ja päivitä tulosta metodi
        //Lisää osa
        public void LisääOsa(Osa osa)
        {
            this.osa = osa;
            
        }
        public void LisääVaraOsa(Osa osa)
        {
            this.varaosa = osa;
        }
        //Tulosta
        public string Tulosta()
        {
            return "K: " + osa.Tulosta()+"v= "+varaosa.Tulosta();
        }
    }
}
