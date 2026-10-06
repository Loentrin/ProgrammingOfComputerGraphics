object Form1: TForm1
  Left = 0
  Top = 0
  Caption = 'LR2'
  ClientHeight = 800
  ClientWidth = 1291
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -12
  Font.Name = 'Segoe UI'
  Font.Style = []
  WindowState = wsMaximized
  OnCreate = FormCreate
  TextHeight = 15
  object Label1: TLabel
    Left = 8
    Top = 8
    Width = 321
    Height = 54
    Caption = 'Image Data Parser'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -40
    Font.Name = 'Segoe UI'
    Font.Style = []
    ParentFont = False
  end
  object Label2: TLabel
    Left = 312
    Top = 137
    Width = 35
    Height = 15
    Caption = '-------'
  end
  object StringGrid1: TStringGrid
    Left = 0
    Top = 208
    Width = 1249
    Height = 692
    Color = clBtnFace
    ColCount = 8
    Ctl3D = True
    DefaultColWidth = 150
    DoubleBuffered = False
    DrawingStyle = gdsClassic
    FixedColor = clAntiquewhite
    FixedCols = 0
    RowCount = 2
    ParentCtl3D = False
    ParentDoubleBuffered = False
    ParentShowHint = False
    ScrollBars = ssVertical
    ShowHint = False
    TabOrder = 0
  end
  object Button2: TButton
    Left = 160
    Top = 133
    Width = 75
    Height = 25
    Caption = 'Run'
    TabOrder = 1
    OnClick = Button2Click
  end
  object LabeledEdit1: TLabeledEdit
    Left = 17
    Top = 134
    Width = 121
    Height = 23
    EditLabel.Width = 70
    EditLabel.Height = 15
    EditLabel.Caption = 'Image folder:'
    TabOrder = 2
    Text = 'images'
  end
end
