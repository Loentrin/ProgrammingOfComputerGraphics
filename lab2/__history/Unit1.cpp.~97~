//---------------------------------------------------------------------------

#include <vcl.h>
#pragma hdrstop
#include <iostream>
#include <string>
#include <algorithm>
#include <fstream>
#include <filesystem>
#include <vector>

#include "Unit1.h"
#include "Parser.h"
#include <System.Threading.hpp>
//---------------------------------------------------------------------------
#pragma package(smart_init)
#pragma resource "*.dfm"
TForm1 *Form1;
//---------------------------------------------------------------------------
__fastcall TForm1::TForm1(TComponent* Owner)
	: TForm(Owner)
{
}
//----------------------------------------------------------

vector<string> filenames;

void __fastcall TForm1::FormCreate(TObject *Sender)
{
	StringGrid1 -> Cells[0][0] = "Filename";
	StringGrid1 -> Cells[1][0] = "Format";
	StringGrid1 -> Cells[2][0] = "Width (px)";
	StringGrid1 -> Cells[3][0] = "Height (px)";
	StringGrid1 -> Cells[4][0] = "Resolution (ppi)";
	StringGrid1 -> Cells[5][0] = "Colour depth (bits)";
	StringGrid1 -> Cells[6][0] = "Compression";
	StringGrid1 -> Cells[7][0] = "Status";
	Label2 -> Caption = "";

}
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------


void __fastcall TForm1::Button2Click(TObject *Sender)
{
    Parser parser;

	int id = 1;
	int correctFiles = 0;
	string folder = AnsiString((LabeledEdit1 -> Text).c_str()).c_str();

	StringGrid1 -> RowCount = 2;
	StringGrid1 -> Rows[1] -> Clear();
	filenames.clear();

	 for(const auto& entry : filesystem::directory_iterator(folder)){
		string filename = entry.path().string();
		parser.openFile(filename);

		if(parser.results[6] == "unknown type"){
			continue;
		}

		if(parser.results[6] == "OK") correctFiles++;


		filenames.push_back(filename);

		filename = filename.substr(filename.find_first_of('\\')+1);

		StringGrid1 -> Cells[0][id] = filename.c_str();
		for(int i = 1; i < 8; i++) StringGrid1 -> Cells[i][id] = parser.results[i-1].c_str();


		StringGrid1 -> RowCount++;
		id++;
	}

	Label2 -> Caption = IntToStr(id-1) + " files, " + IntToStr(correctFiles) + " read correctly";
}
//---------------------------------------------------------------------------


