namespace viikko2_kt4
{
    partial class Frm1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.dgV1 = new System.Windows.Forms.DataGridView();
            this.Etunimi = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Sukunimi = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Ikä = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.lbl1 = new System.Windows.Forms.Label();
            this.lbl2 = new System.Windows.Forms.Label();
            this.lbl3 = new System.Windows.Forms.Label();
            this.txtB1 = new System.Windows.Forms.TextBox();
            this.txtB2 = new System.Windows.Forms.TextBox();
            this.txtB3 = new System.Windows.Forms.TextBox();
            this.btn1 = new System.Windows.Forms.Button();
            this.btn2 = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dgV1)).BeginInit();
            this.SuspendLayout();
            // 
            // dgV1
            // 
            this.dgV1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgV1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.Etunimi,
            this.Sukunimi,
            this.Ikä});
            this.dgV1.Location = new System.Drawing.Point(1, 12);
            this.dgV1.Name = "dgV1";
            this.dgV1.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgV1.Size = new System.Drawing.Size(351, 131);
            this.dgV1.TabIndex = 0;
            this.dgV1.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.DgV1_CellContentClick);
            // 
            // Etunimi
            // 
            this.Etunimi.HeaderText = "Etunimi";
            this.Etunimi.Name = "Etunimi";
            // 
            // Sukunimi
            // 
            this.Sukunimi.HeaderText = "Sukunimi";
            this.Sukunimi.Name = "Sukunimi";
            // 
            // Ikä
            // 
            this.Ikä.HeaderText = "Ikä";
            this.Ikä.Name = "Ikä";
            // 
            // lbl1
            // 
            this.lbl1.AutoSize = true;
            this.lbl1.Font = new System.Drawing.Font("Microsoft Sans Serif", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl1.Location = new System.Drawing.Point(12, 168);
            this.lbl1.Name = "lbl1";
            this.lbl1.Size = new System.Drawing.Size(88, 24);
            this.lbl1.TabIndex = 1;
            this.lbl1.Text = "Etunimi : ";
            // 
            // lbl2
            // 
            this.lbl2.AutoSize = true;
            this.lbl2.Font = new System.Drawing.Font("Microsoft Sans Serif", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl2.Location = new System.Drawing.Point(12, 210);
            this.lbl2.Name = "lbl2";
            this.lbl2.Size = new System.Drawing.Size(103, 24);
            this.lbl2.TabIndex = 2;
            this.lbl2.Text = "Sukunimi : ";
            // 
            // lbl3
            // 
            this.lbl3.AutoSize = true;
            this.lbl3.Font = new System.Drawing.Font("Microsoft Sans Serif", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl3.Location = new System.Drawing.Point(12, 252);
            this.lbl3.Name = "lbl3";
            this.lbl3.Size = new System.Drawing.Size(48, 24);
            this.lbl3.TabIndex = 3;
            this.lbl3.Text = "Ikä : ";
            this.lbl3.Click += new System.EventHandler(this.Label1_Click);
            // 
            // txtB1
            // 
            this.txtB1.Location = new System.Drawing.Point(129, 172);
            this.txtB1.Name = "txtB1";
            this.txtB1.Size = new System.Drawing.Size(109, 20);
            this.txtB1.TabIndex = 4;
            // 
            // txtB2
            // 
            this.txtB2.Location = new System.Drawing.Point(129, 215);
            this.txtB2.Name = "txtB2";
            this.txtB2.Size = new System.Drawing.Size(109, 20);
            this.txtB2.TabIndex = 5;
            // 
            // txtB3
            // 
            this.txtB3.Location = new System.Drawing.Point(129, 256);
            this.txtB3.Name = "txtB3";
            this.txtB3.Size = new System.Drawing.Size(109, 20);
            this.txtB3.TabIndex = 6;
            // 
            // btn1
            // 
            this.btn1.Location = new System.Drawing.Point(129, 330);
            this.btn1.Name = "btn1";
            this.btn1.Size = new System.Drawing.Size(109, 53);
            this.btn1.TabIndex = 7;
            this.btn1.Text = "Lisää listaan";
            this.btn1.UseVisualStyleBackColor = true;
            this.btn1.Click += new System.EventHandler(this.Btn1_Click);
            // 
            // btn2
            // 
            this.btn2.Location = new System.Drawing.Point(12, 330);
            this.btn2.Name = "btn2";
            this.btn2.Size = new System.Drawing.Size(99, 53);
            this.btn2.TabIndex = 8;
            this.btn2.Text = "Vie";
            this.btn2.UseVisualStyleBackColor = true;
            this.btn2.Click += new System.EventHandler(this.button1_Click);
            // 
            // Frm1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.btn2);
            this.Controls.Add(this.btn1);
            this.Controls.Add(this.txtB3);
            this.Controls.Add(this.txtB2);
            this.Controls.Add(this.txtB1);
            this.Controls.Add(this.lbl3);
            this.Controls.Add(this.lbl2);
            this.Controls.Add(this.lbl1);
            this.Controls.Add(this.dgV1);
            this.Name = "Frm1";
            this.Text = "Frm1";
            this.Load += new System.EventHandler(this.Frm1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dgV1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView dgV1;
        private System.Windows.Forms.DataGridViewTextBoxColumn Etunimi;
        private System.Windows.Forms.DataGridViewTextBoxColumn Sukunimi;
        private System.Windows.Forms.DataGridViewTextBoxColumn Ikä;
        private System.Windows.Forms.Label lbl1;
        private System.Windows.Forms.Label lbl2;
        private System.Windows.Forms.Label lbl3;
        private System.Windows.Forms.TextBox txtB1;
        private System.Windows.Forms.TextBox txtB2;
        private System.Windows.Forms.TextBox txtB3;
        private System.Windows.Forms.Button btn1;
        private System.Windows.Forms.Button btn2;
    }
}

