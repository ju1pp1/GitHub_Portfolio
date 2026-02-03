using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace viikko2_kt4
{
    public partial class Frm1 : Form
    {
      
        public Frm1()
        {
            InitializeComponent();
            
        }

        private void Label1_Click(object sender, EventArgs e)
        {

        }

        private void DgV1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
        
        private void Frm1_Load(object sender, EventArgs e)
        {
            
        }

        private void Btn1_Click(object sender, EventArgs e)
        {
            
            int n = dgV1.Rows.Add();
            dgV1.Rows[n].Cells[0].Value = txtB1.Text;
            dgV1.Rows[n].Cells[1].Value = txtB2.Text;
            dgV1.Rows[n].Cells[2].Value = txtB3.Text;
        }
       
        private void button1_Click(object sender, EventArgs e)
        {
            Frm2 frm2 = new Frm2();
            frm2.txtval = txtB1.Text;
            frm2.ShowDialog();
            //SetValueForText1 = txtB1.Text;
            //SetValueForText2 = txtB2.Text;
            //SetValueForText3 = txtB3.Text;

            //frm2.listBox1.Text = this.dgV1.CurrentRow.Cells[0].Value.ToString();
            //frm2.listBox1.Text = this.dgV1.CurrentRow.Cells[1].Value.ToString();
            //frm2.listBox1.Text = this.dgV1.CurrentRow.Cells[2].Value.ToString();
            //frm2.ShowDialog();
        }
    }
}
