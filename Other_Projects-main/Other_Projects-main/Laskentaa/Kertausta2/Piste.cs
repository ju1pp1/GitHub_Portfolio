using System; // Tämä tarvitaan Math. -luokkaa varten

namespace Kertausta2
{
    class Piste 
    {
        private double x;
        private double y;

        public Piste()
        {

        }

        public Piste(double x, double y)
        {
            this.x = x;
            this.y = y;
        }

         public virtual double Etäisyys(Piste p)
        {
            double dx = Math.Abs(p.x - x);
            double dy = Math.Abs(p.y - y);
            return Math.Sqrt(dx * dx + dy * dy);
        }

    }
}