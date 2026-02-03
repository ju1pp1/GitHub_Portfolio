namespace Teht4
{
    partial class Form1
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
            this.dgNimet = new System.Windows.Forms.DataGridView();
            this.btnAdd = new System.Windows.Forms.Button();
            this.lblEtunimi = new System.Windows.Forms.Label();
            this.gbAdd = new System.Windows.Forms.GroupBox();
            this.numIka = new System.Windows.Forms.NumericUpDown();
            this.lblIka = new System.Windows.Forms.Label();
            this.lblSukunimi = new System.Windows.Forms.Label();
            this.tbSukunimi = new System.Windows.Forms.TextBox();
            this.tbEtunimi = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.dgNimet)).BeginInit();
            this.gbAdd.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numIka)).BeginInit();
            this.SuspendLayout();
            // 
            // dgNimet
            // 
            this.dgNimet.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgNimet.Location = new System.Drawing.Point(0, 229);
            this.dgNimet.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.dgNimet.Name = "dgNimet";
            this.dgNimet.Size = new System.Drawing.Size(373, 304);
            this.dgNimet.TabIndex = 0;
            // 
            // btnAdd
            // 
            this.btnAdd.Location = new System.Drawing.Point(187, 118);
            this.btnAdd.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btnAdd.Name = "btnAdd";
            this.btnAdd.Size = new System.Drawing.Size(156, 79);
            this.btnAdd.TabIndex = 9;
            this.btnAdd.Text = "Lisää";
            this.btnAdd.UseVisualStyleBackColor = true;
            this.btnAdd.Click += new System.EventHandler(this.btnAdd_Click);
            // 
            // lblEtunimi
            // 
            this.lblEtunimi.AutoSize = true;
            this.lblEtunimi.Location = new System.Drawing.Point(21, 47);
            this.lblEtunimi.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblEtunimi.Name = "lblEtunimi";
            this.lblEtunimi.Size = new System.Drawing.Size(65, 20);
            this.lblEtunimi.TabIndex = 2;
            this.lblEtunimi.Text = "Etunimi";
            this.lblEtunimi.Click += new System.EventHandler(this.lblEtunimi_Click);
            // 
            // gbAdd
            // 
            this.gbAdd.Controls.Add(this.numIka);
            this.gbAdd.Controls.Add(this.lblIka);
            this.gbAdd.Controls.Add(this.lblSukunimi);
            this.gbAdd.Controls.Add(this.tbSukunimi);
            this.gbAdd.Controls.Add(this.tbEtunimi);
            this.gbAdd.Controls.Add(this.btnAdd);
            this.gbAdd.Controls.Add(this.lblEtunimi);
            this.gbAdd.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.gbAdd.Location = new System.Drawing.Point(0, 7);
            this.gbAdd.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gbAdd.Name = "gbAdd";
            this.gbAdd.Padding = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.gbAdd.Size = new System.Drawing.Size(373, 214);
            this.gbAdd.TabIndex = 3;
            this.gbAdd.TabStop = false;
            // 
            // numIka
            // 
            this.numIka.Location = new System.Drawing.Point(278, 74);
            this.numIka.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.numIka.Maximum = new decimal(new int[] {
            120,
            0,
            0,
            0});
            this.numIka.Name = "numIka";
            this.numIka.Size = new System.Drawing.Size(65, 26);
            this.numIka.TabIndex = 8;
            // 
            // lblIka
            // 
            this.lblIka.AutoSize = true;
            this.lblIka.Location = new System.Drawing.Point(274, 50);
            this.lblIka.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblIka.Name = "lblIka";
            this.lblIka.Size = new System.Drawing.Size(30, 20);
            this.lblIka.TabIndex = 7;
            this.lblIka.Text = "Ikä";
            // 
            // lblSukunimi
            // 
            this.lblSukunimi.AutoSize = true;
            this.lblSukunimi.Location = new System.Drawing.Point(117, 47);
            this.lblSukunimi.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lblSukunimi.Name = "lblSukunimi";
            this.lblSukunimi.Size = new System.Drawing.Size(77, 20);
            this.lblSukunimi.TabIndex = 6;
            this.lblSukunimi.Text = "Sukunimi";
            // 
            // tbSukunimi
            // 
            this.tbSukunimi.Location = new System.Drawing.Point(117, 73);
            this.tbSukunimi.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tbSukunimi.Name = "tbSukunimi";
            this.tbSukunimi.Size = new System.Drawing.Size(153, 26);
            this.tbSukunimi.TabIndex = 4;
            // 
            // tbEtunimi
            // 
            this.tbEtunimi.Location = new System.Drawing.Point(8, 73);
            this.tbEtunimi.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tbEtunimi.Name = "tbEtunimi";
            this.tbEtunimi.Size = new System.Drawing.Size(99, 26);
            this.tbEtunimi.TabIndex = 3;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(404, 533);
            this.Controls.Add(this.gbAdd);
            this.Controls.Add(this.dgNimet);
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "Form1";
            this.Text = "Henkilöt";
            ((System.ComponentModel.ISupportInitialize)(this.dgNimet)).EndInit();
            this.gbAdd.ResumeLayout(false);
            this.gbAdd.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numIka)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.DataGridView dgNimet;
        private System.Windows.Forms.Button btnAdd;
        private System.Windows.Forms.Label lblEtunimi;
        private System.Windows.Forms.GroupBox gbAdd;
        private System.Windows.Forms.Label lblIka;
        private System.Windows.Forms.Label lblSukunimi;
        private System.Windows.Forms.TextBox tbSukunimi;
        private System.Windows.Forms.TextBox tbEtunimi;
        private System.Windows.Forms.NumericUpDown numIka;
    }
}

