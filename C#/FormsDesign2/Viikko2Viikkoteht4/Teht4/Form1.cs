using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Teht4
{
    public partial class Form1 : Form
    {
        public struct Henkilo
        {
            public string etunimi;
            public string sukunimi;
            public long ika;

            public string Etunimi { get { return etunimi; } }
            public string Sukunimi { get { return sukunimi; } }
            public long Ika { get { return ika; } }

        }

        public List<Henkilo> henkilot = new List<Henkilo>();

        public Form1()
        {
            InitializeComponent();
            dgNimet.DataSource = henkilot;
        }


        private void lblEtunimi_Click(object sender, EventArgs e)
        {

        }

        private void btnAdd_Click(object sender, EventArgs e)
        {

                Henkilo h;
                h.etunimi = tbEtunimi.Text;
                h.sukunimi = tbSukunimi.Text;
                h.ika = (long) numIka.Value;
                henkilot.Add(h);
                dgNimet.DataSource = null;
                dgNimet.DataSource = henkilot;
        }
    }
}
